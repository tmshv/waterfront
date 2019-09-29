export function createUrl(slug?: string) {
    return slug
        ? `/projects/${slug}`
        : '/'
}
