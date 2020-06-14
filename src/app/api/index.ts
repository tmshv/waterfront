import { AppPointFeature } from '../types'
import { createFeaturePointList } from './factory'

export async function json(url: string) {
    const res = await fetch(url)
    return res.json()
}

export async function getFeatures(lang: string, city: string, full = false): Promise<AppPointFeature[]> {
    const geojson = await json(`/static/${city}.geojson`)

    return createFeaturePointList(geojson)
}
