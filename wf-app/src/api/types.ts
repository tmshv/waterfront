import { FeatureCollection, Point } from 'geojson'

export type FeatureSettingsDto = {
    color: string
    created_by: number
    created_on: number
    field_target: string
    field_value: string
    id: number
}

export type FeatureCollectionDto = FeatureCollection<Point, {
    actorType: string
    city: string
    name: string
    previewImage: string
    projectType: string
    short: string
    slug: string
    year: number
}>
