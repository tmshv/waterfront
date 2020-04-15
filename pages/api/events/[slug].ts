import { NextApiRequest, NextApiResponse } from 'next'
import { createApiUrl } from '../../../src/server/lib'
import { IApiResponse, IEventDto } from '../../../src/server/types'
import { createEvent } from '../../../src/server/factory'
import { getJson, q } from '../../../src/lib/fetch'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const lang = q(req.query.lang)
    const slug = q(req.query.slug)
    const url = createApiUrl(
        `/api/_/items/events?filter[slug][eq]=${slug}`
    )
    
    try {
        const response = await getJson<IApiResponse<IEventDto[]>>(url)
        res.json(
            createEvent(response.data[0], lang),
        )
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}
