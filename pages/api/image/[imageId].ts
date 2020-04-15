import { NextApiRequest, NextApiResponse } from 'next'
import { createApiUrl } from '../../../src/server/lib'
import { IApiResponse } from '../../../src/server/types'
import { getJson } from '../../../src/lib/fetch'

interface IImageDto {
    // "charset": "binary",
    // "checksum": "e8b892ab087b61c4482c1282ef71c8a8",
    data: {
        // "embed": null,
        full_url: string
        // "thumbnails": [
        //     {
        //         "dimension": "200x200",
        //         "height": 200,
        //         "relative_url": "/thumbnail/_/200/200/crop/good/2019-10-03_12.26.20.jpg",
        //         "url": "https://wf.tmshv.com/thumbnail/_/200/200/crop/good/2019-10-03_12.26.20.jpg",
        //         "width": 200
        //     }
        // ],
        // "url": "/api/uploads/_/originals/2019-10-03_12.26.20.jpg"
    }
    // "description": "",
    // "duration": null,
    // "embed": null,
    // "filename": "2019-10-03_12.26.20.jpg",
    // "filesize": 80442,
    // "folder": null,
    // "height": 630,
    // "id": 77,
    // "location": "",
    // "metadata": null,
    // "storage": "local",
    // "tags": [],
    // "title": "2019 10 03 12.26.20",
    // "type": "image/jpeg",
    // "uploaded_by": 6,
    // "uploaded_on": "2019-10-04T10:29:13+00:00",
    // "width": 1200
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const imageId = Array.isArray(req.query.imageId) ? req.query.imageId[0] : req.query.imageId
    const response = await getJson<IApiResponse<IImageDto>>(createApiUrl(`/api/_/files/${imageId}`))
    const image = response.data.data.full_url

    try {
        res.json({
            image,
        })
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}
