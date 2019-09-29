import { FeatureCollection, Point, Feature } from 'geojson'

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
