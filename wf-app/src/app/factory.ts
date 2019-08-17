import { IArticle } from './types'
import { renderMarkdown } from '../lib'

export function toArticle(feature: any): IArticle {
    const short = feature.properties.short
    const year: string | number = feature.properties.year

    return {
        ...feature.properties,
        short: short ? renderMarkdown(short) : '',
        name: renderMarkdown(feature.properties.name),
        body: feature.properties.content,
        url: `/project/${feature.properties.slug}`,
        date: year ? new Date(Number(year), 1, 1) : null,
    }
}

export function aboutToArticle(about) {
    return {
        ...about,
        previewImage: 'https://wf.tmshv.com/api/uploads/_/originals/IMG_3643.jpg',
        // https://wf.tmshv.com/api/uploads/_/originals/IMG_3643.jpg
        // body: renderMarkdown(about.content),
        body: about.content,
        // url: `/project/${feature.properties.slug}`,
    }
}
