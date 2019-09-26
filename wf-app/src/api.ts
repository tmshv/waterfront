import fetch from 'isomorphic-unfetch'
import { cleanText } from './lib/text'

export async function json(url) {
    const res = await fetch(url)
    return res.json()
}

export async function getFeatureSettings() {
    const featureSettings = await json('https://wf.tmshv.com/api/_/items/feature_settings')

    return featureSettings['data']
}

export async function getFeatures(city, full = false) {
    let url = `https://wf.tmshv.com/data/en/${city}/published/features`
    if (full) {
        url += '?full=1'
    }
    const geojson = await json(url)

    // to do 
    geojson.features.forEach((x, i) => {
        if (!x.properties.id) {            
            x.properties.id = `feature-${i}`
        }
    })

    return geojson
}

export async function getFeature(slug) {
    const geojson = await json(`https://wf.tmshv.com/data/en/features/${slug}`)

    // to do 
    geojson.features.forEach((x, i) => {
        // if (!x.properties.id) {
        //     x.properties.id = `feature-${i}`
        // }
    })

    return geojson
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

export async function getPersons() {
    return json(`https://wf.tmshv.com/data/en/persons`)
}
