import { NextApiRequest, NextApiResponse } from 'next'
import { getFeatures, Lang } from '@/api'

function item<T>(param?: T | T[]): T | undefined {
    if (Array.isArray(param)) {
        return param[0]
    }

    if (!param) {
        return undefined
    }

    return param
}

function langFromString(lang?: string): Lang | null {
    if (lang === 'en' || lang === 'ru') {
        return lang
    }

    return null
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const lang = langFromString(item(req.query.lang))
    if (!lang) {
        return res.status(400).json({
            error: 'wrong lang: use one of ru | en',
        })
    }

    const city = item(req.query.city)
    if (!city) {
        return res.status(400).json({
            error: 'wrong city: use one of oslo | stockholm | saint_petersburg',
        })
    }

    const features = await getFeatures(lang, city)
    if (!features) {
        return res.status(404).json({
            error: 'not found',
        })
    }

    return res.json(features)
}
