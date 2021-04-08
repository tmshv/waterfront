import * as fs from 'fs'
import { promisify } from 'util'
import { join, relative } from 'path'
import matter from 'gray-matter'
import { parse } from 'date-fns'
import glob from 'glob'
import { includes } from './lib/set'
import { PageDefinition } from './types'
import { FeatureCollection } from 'geojson'
import { changeLangPathSuffix } from './lib/lang'

const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)

export type Lang = string
const defaultLocale: Lang = 'ru'

type SortFunction<T> = (a: T, b: T) => number
const postsDirectory = join(process.cwd(), 'data')

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

export async function getPages() {
    const pattern = join(process.cwd(), 'data', '**/*.md?(x)')
    const files = await getFilesByPattern(pattern, {})

    return files.map(path => {
        const slug = getSlugFromPath(path)
        const locale = getLocaleFromPath(path)

        return {
            path,
            slug,
            locale,
        }
    })
}

function getSlugFromPath(path: string) {
    const rel = relative(postsDirectory, path)
    const realSlug = rel
        .replace(/\.\w{2}\.mdx?$/, '')

    return `/${realSlug}`
}

function getLocaleFromPath(path: string) {
    const pattern = /\.(.{2})\.mdx?$/
    const m = pattern.exec(path)
    if (!m) {
        return defaultLocale
    }

    return m[1]
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

export async function getPageBySlug(lang: Lang | undefined, slug: string) {
    const name = `${slug}.${lang}.md`
    const path = join(postsDirectory, name)

    return getPage(path)
}

export async function getPagesByTag(lang: Lang | undefined, tags: string[], options: GetPagesByTagOptions<PageDefinition>) {
    const files = await getPages()
    const pages = await Promise.all(files
        .filter(({ locale }) => locale === lang)
        .map(({ path }) => path)
        .map(getPage)
    )
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
