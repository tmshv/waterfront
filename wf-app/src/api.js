import fetch from 'isomorphic-unfetch'

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