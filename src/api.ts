import * as fs from 'fs'
import { promisify } from 'util'
import { join, relative } from 'path'
import matter from 'gray-matter'
import { parse } from 'date-fns'
import glob from 'glob'
import { includes } from './lib/set'
import { PageDefinition, ICity } from './types'
import { FeatureCollection } from 'geojson'
import { changeLangPathSuffix } from './lib/lang'

const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)

// export type Lang = 'ru' | 'en'
export type Lang = string
const defaultLang: Lang = 'ru'
const otherLangs: Lang[] = ['en']

type SortFunction<T> = (a: T, b: T) => number
const postsDirectory = join(process.cwd(), 'pages')

const cityLabels = new Map([
    ['saint_petersburg', 'Saint Petersburg'],
    ['oslo', 'Oslo'],
    ['stockholm', 'Stockholm'],
    ['kaunas', 'Kaunas'],
])

function getLangAgnosticSlug(slug: string): string {
    return slug.replace(/\/en$/, '')
}

async function readJson<T>(filename: string): Promise<T | null> {
    const e = await exists(filename)
    if (!e) {
        return null
    }

    try {
        const data = await readFile(filename, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}

async function getFilesByPattern(pattern: string, options: any) {
    return new Promise<string[]>((resolve, reject) => {
        glob(pattern, options, function (er, files: string[]) {
            if (er) {
                return reject(er)
            }

            resolve(files)
        })
    })
}

function slugHasSuffix(slug: string, suffixes: string[]): boolean {
    for (const suffix of suffixes) {
        if (slug.endsWith(suffix)) {
            return true
        }
    }
    return false
}

function createLangFilter(lang: Lang = defaultLang) {
    if (lang === defaultLang) {
        const langSuffixes = otherLangs.map(x => `/${x}`)
        return (path: string) => {
            const slug = getSlugFromPath(path)

            return !slugHasSuffix(slug, langSuffixes)
        }
    }

    return (path: string) => {
        const slug = getSlugFromPath(path)
        return slug.endsWith(`/${lang}`)
    }
}

async function getPages(lang?: Lang) {
    const pattern = join(process.cwd(), 'pages', '**/*.md?(x)')
    const files = await getFilesByPattern(pattern, {})
    const langFilter = createLangFilter(lang)
    return files.filter(langFilter)

    // return files.filter(path => {
    //     const slug = getSlugFromPath(path)
    //     if (slug.endsWith('/en')) {
    //         return false
    //     }

    //     return true
    // })
}

function getSlugFromPath(path: string) {
    const rel = relative(postsDirectory, path)
    const realSlug = rel
        .replace(/\.mdx?$/, '')
        .replace(/\/index$/, '')

    return `/${realSlug}`
}

function getTitle(data: string) {
    const rows = data.split('\n')
    const p = /^#\s?(.*)$/
    for (const row of rows) {
        const m = p.exec(row)
        if (!m) {
            continue
        }

        return m[1]
    }

    return null
}

async function getPage(path: string): Promise<PageDefinition> {
    // const realSlug = slug.replace(/\.md$/, '')
    // const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = await readFile(path, 'utf8')
    const { data, content } = matter(fileContents)

    // return data['url']
    const slug = getSlugFromPath(path)
    const title = getTitle(content)

    const tags: string[] = data.tags ?? []
    const excerpt: string = data.excerpt ?? ''
    const cover: string = data.cover ?? ''

    const date = data.date ?
        parse(data.date, 'dd.MM.yyyy', new Date())
            .toString()
        : null

    return {
        ...data,
        date,
        cover,
        excerpt,
        tags,
        title,
        slug,
        content,
    }
}

type GetPagesByTagOptions<T> = {
    omitContent: boolean,
    sort: SortFunction<T>
}

export async function getPagesByTag(lang: Lang | undefined, tags: string[], options: GetPagesByTagOptions<PageDefinition>) {
    const files = await getPages(lang)
    const pages = await Promise.all(files.map(getPage))
    const tagsSubset = new Set(tags)

    const taggedPages = pages
        .filter(page => {
            const tags = new Set(page.tags)

            return includes(tags, tagsSubset)
        })

    if (!options.omitContent) {
        return taggedPages.sort(options.sort)
    }

    return taggedPages
        .map(x => {
            const { content, ...page } = x

            return page
        })
        .sort(options.sort)
}

export async function getAllSlugs() {
    const files = await getPages('ru')

    const slugs = files
        .map(getSlugFromPath)

    return slugs
}

export async function getFeatures(lang: Lang, city: string): Promise<FeatureCollection | null> {
    // Find a geojson file of city
    const filename = join(process.cwd(), 'src', `${city}.geojson`)
    const featureCollection = await readJson<FeatureCollection>(filename)
    if (!featureCollection) {
        return null
    }

    // Populate it with data from pages
    const pages = await getPagesByTag(lang, ['feature'], {
        omitContent: true,
        sort: (a, b) => 0,
    })
    const pd = pages.reduce((pd, page) => {
        const slug = getLangAgnosticSlug(page.slug)
        return pd.set(slug, page)
    }, new Map<string, any>())

    const cityLabel = cityLabels.get(city)

    featureCollection.features.forEach(feature => {
        if (!feature.properties) {
            feature.properties = {}
        }

        const slug = feature.properties.slug
        if (!pd.has(slug)) {
            return
        }

        const page = pd.get(slug)
        feature.properties.id = slug
        feature.properties.href = changeLangPathSuffix(lang, slug)
        feature.properties.excerpt = page.excerpt
        feature.properties.title = page.title
        feature.properties.cover = page.cover
        feature.properties.year = page.year
    })

    return featureCollection
}
