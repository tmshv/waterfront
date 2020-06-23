import absoluteUrl from 'next-absolute-url'
import { parse, format } from 'date-fns'

export function createApiUrl(req: any, path: string): string {
    const { origin } = absoluteUrl(req, 'localhost:3000')

    return `${origin}${path}`
}

export function parsePageDate(value: string): Date | null {
    if (!value) {
        return null
    }

    return parse(value, 'dd.MM.yyyy', new Date())
}

export function formatDate(date: Date): string {
    return format(date, 'dd.MM.yyyy')
}
