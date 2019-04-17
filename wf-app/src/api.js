import fetch from 'isomorphic-unfetch'

export async function json(url) {
    const res = await fetch(url)
    return res.json()
}

export async function getFeatureSettings() {
    const featureSettings = await json('https://wf.tmshv.com/api/_/items/feature_settings')

    return featureSettings['data']
}