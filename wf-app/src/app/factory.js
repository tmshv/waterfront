import { renderMarkdown } from '../lib'

export function toArticle(feature) {
    const short = feature.properties.short

    return {
        ...feature.properties,
        short: short ? renderMarkdown(short) : '',
        name: renderMarkdown(feature.properties.name),
        body: feature.properties.content,
        url: `/project/${feature.properties.slug}`,
    }
}
