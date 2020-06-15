import { AppPointFeature } from '../types'

export async function json(url: string) {
    const res = await fetch(url)
    return res.json()
}
