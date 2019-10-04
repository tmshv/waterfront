export function createUrl(slug?: string) {
    return slug
        ? `/project/${slug}`
        : '/'
}
