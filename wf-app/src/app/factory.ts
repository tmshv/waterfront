import { IArticle, AppPointFeature } from './types'
import { renderMarkdown } from '../lib'

export function featureToArticle(feature: AppPointFeature): IArticle {
    const short = feature.properties.short
    const year: string | number = feature.properties.year
    const body = feature.properties.content
        ? feature.properties.content
        : ''

    return {
        ...feature.properties,
        short: short ? renderMarkdown(short) : '',
        body,
        name: renderMarkdown(feature.properties.name),
        url: `/project/${feature.properties.slug}`,
        date: year
            ? new Date(Number(year), 1, 1)
            : undefined,
    }
}
