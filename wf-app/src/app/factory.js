export function toArticle(feature) {
    return {
        ...feature.properties,
        body: feature.properties.content,
        url: `/project/${feature.properties.slug}`,
    }
}
