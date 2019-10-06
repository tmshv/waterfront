import { NextApiRequest, NextApiResponse } from 'next'
import { createApiUrl } from '../../../src/server/lib'
import { IApiResponse, IEventDto } from '../../../src/server/types'
import { createEvent } from '../../../src/server/factory'
import { getJson } from '../../../src/lib/fetch'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const lang = Array.isArray(req.query.lang) ? req.query.lang[0] : req.query.lang
    const response = await getJson<IApiResponse<IEventDto[]>>(createApiUrl('/api/_/items/events'))

    try {
        const items = response.data
            .filter(x => {
                return x.slug && x.status === 'published'
            })
            .map(x => createEvent(x, lang))
            .sort(
                (a, b) => b.date.getTime() - a.date.getTime()
            )
        res.json(items)
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}
