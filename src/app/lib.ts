import absoluteUrl from 'next-absolute-url'

export function createApiUrl(req: any, path: string): string {
    const { origin } = absoluteUrl(req, 'localhost:3000')

    return `${origin}${path}`
}
