import fetch from 'isomorphic-unfetch'

export async function getJson<T>(url: string): Promise<T> {
    const res = await fetch(url)

    return res.json()
}
