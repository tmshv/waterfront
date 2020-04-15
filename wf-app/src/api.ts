import fs from 'fs'
import { join, relative } from 'path'
import matter from 'gray-matter'
import glob from 'glob'

const postsDirectory = join(process.cwd(), 'pages')

async function getPages() {
    const pattern = join(process.cwd(), 'pages', '**/*.md?(x)')
    const options = {

    }

    return new Promise<string[]>((resolve, reject) => {
        glob(pattern, options, function (er, files: string[]) {
            if (er) {
                return reject(er)
            }

            resolve(files)
        })
    })
}

function getSlugFromPath(path: string) {
    const rel = relative(postsDirectory, path)
    const realSlug = rel.replace(/\.mdx?$/, '')

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

async function getPage(path: string) {
    // const realSlug = slug.replace(/\.md$/, '')
    // const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(path, 'utf8')
    const { data, content } = matter(fileContents)

    // return data['url']
    const slug = getSlugFromPath(path)
    const title = getTitle(content)

    const tags: string[] = data.tags ?? []

    return {
        ...data,
        tags,
        title,
        slug,
        content,
    }
}

type GetPagesByTagOptions = {
    omitContent: boolean
}

export async function getPagesByTag(tag: string, options: GetPagesByTagOptions) {
    const files = await getPages()
    const pages = await Promise.all(files.map(getPage))

    const taggedPages = pages
        .filter(page => {
            const tags = new Set<string>(page.tags)

            return tags.has(tag)
        })

    if (!options.omitContent) {
        return taggedPages
    }

    return taggedPages.map(x => {
        const { content, ...page } = x

        return page
    })
    // const realSlug = slug.replace(/\.md$/, '')
    // const fullPath = join(postsDirectory, `${realSlug}.md`)
    // const fileContents = fs.readFileSync(fullPath, 'utf8')
    // const { data, content } = matter(fileContents)

    // const items = {}

    // // Ensure only the minimal needed data is exposed
    // fields.forEach(field => {
    //     if (field === 'slug') {
    //         items[field] = realSlug
    //     }
    //     if (field === 'content') {
    //         items[field] = content
    //     }

    //     if (data[field]) {
    //         items[field] = data[field]
    //     }
    // })

    // return items
}

export async function getAllSlugs() {
    const files = await getPages()

    const slugs = files
        .map(getSlugFromPath)

    return slugs
}
