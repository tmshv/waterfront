import { FeatureCollection, Point, Feature } from 'geojson'

export interface IApiResponse<T> {
    data: T
    public: boolean
}

export type PersonDto = {
    content: string
    name: string
    previewImage: string
    role: 'partner' | 'expert' | 'team'
}

export type AboutDto = {
    content_ru: string
    content_en: string
    name_en: string
    name_ru: string
    // "created_by": 1,
    // "created_on": "2019-05-24 16:19:46",
    // "id": 1,
    preview_image: number
    status: 'published'
}

export type ImageDto = {
    // "charset": "binary",
    // "checksum": "0ae1a763ad36433bc7031290b3a00704",
    data: {
        // "embed": null,
        url: string
        full_url: string
        thumbnails: Array<{
            height: number
            width: number
            url: string
            // "dimension": "200x200",
            // "relative_url": "/thumbnail/_/200/200/crop/good/wf_about_head.jpg",
        }>,
    },
    // "description": "",
    // "duration": null,
    // "embed": null,
    // "filename": "wf_about_head.jpg",
    // "filesize": 762118,
    // "folder": null,
    // "height": 1600,
    // "id": 51,
    // "location": "",
    // "metadata": null,
    // "storage": "local",
    // "tags": [],
    // "title": "Wf About Head",
    // "type": "image/jpeg",
    // "uploaded_by": 4,
    // "uploaded_on": "2019-05-31T11:49:04+00:00",
    // "width": 2400
}

type FeatureProperties = {
    actorType: string
    city: string
    name: string
    previewImage: string
    projectType: string
    short: string
    content: string
    slug: string
    year: number
}

export type FeatureSettingsDto = {
    color: string
    created_by: number
    created_on: number
    field_target: string
    field_value: string
    id: number
}

export type FeatureDto = Feature<Point, FeatureProperties>
export type FeatureCollectionDto = FeatureCollection<Point, FeatureProperties>
