import fetch from 'isomorphic-unfetch'
import { IFeatureSettings, AppPointFeature, IArticle, IPerson } from '../app/types'
import { createFeatureSettingsList, createFeaturePointList, createFeature, createAboutArticle, createPersons } from './factory'
import { IApiResponse, ImageDto, AboutDto } from './types'

export async function json(url: string) {
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

export async function getAbout(lang: string): Promise<IArticle> {
    const res: IApiResponse<AboutDto> = await json(`https://wf.tmshv.com/api/_/items/about/1`)
    const image = await getImageUrl(res.data.preview_image)

    return createAboutArticle(lang, res.data, image)
}

export async function getPersons(lang: string): Promise<IPerson[]> {
    const items = await json(`https://wf.tmshv.com/data/${lang}/persons`)

    return createPersons(items)
}

export async function getImageUrl(imageId: number): Promise<string> {
    const res: IApiResponse<ImageDto> = await json(`https://wf.tmshv.com/api/_/files/${imageId}`)

    return res.data.data.full_url
}