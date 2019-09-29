import fetch from 'isomorphic-unfetch'
import { cleanText } from '../lib/text'
import { IFeatureSettings, AppPointFeature } from '../app/types'
import { createFeatureSettingsList, createFeaturePointList, createFeature } from './factory'
import { Point, Feature } from 'geojson'

export async function json(url) {
    const res = await fetch(url)
    return res.json()
}

export async function getFeatureSettings(): Promise<IFeatureSettings[]> {
    const featureSettings = await json('https://wf.tmshv.com/api/_/items/feature_settings')

    return createFeatureSettingsList(featureSettings['data'])
}

export async function getFeatures(lang: string, city: string, full = false): Promise<AppPointFeature[]> {
    let url = `https://wf.tmshv.com/data/${lang}/${city}/published/features`
    if (full) {
        url += '?full=1'
    }
    const geojson = await json(url)

    return createFeaturePointList(geojson)
}

export async function getFeature(lang: string, slug: string): Promise<AppPointFeature> {
    const geojson = await json(`https://wf.tmshv.com/data/${lang}/features/${slug}`)

    return createFeature(geojson)
}

export async function getAbout(lang: string) {
    const res = await json(`https://wf.tmshv.com/api/_/items/about/1`)
    const { content_en, content_ru, name_en, name_ru, ...about } = res.data
    
    const name = lang === 'en' ? name_en : name_ru
    const content = lang === 'en' ? content_en : content_ru

    return {
        ...about,
        name,
        content: cleanText(content),
    }
}

export async function getPersons(lang: string) {
    const items = await json(`https://wf.tmshv.com/data/${lang}/persons`)

    return items.map(x => ({
        ...x,
        content: cleanText(x.content),
    }))
}
