import fetch from 'isomorphic-unfetch'

export async function getJson<T>(jsonUrl: string, query?: object): Promise<T> {
    const url = new URL(jsonUrl)

    if (query) {
        Object.keys(query).forEach(
            key => url.searchParams.append(key, query[key])
        )
    }

    const res = await fetch(`${url}`)

    return res.json()
}

export function q(value: string | string[]): string {
    return Array.isArray(value)
        ? value[0]
        : value
}
