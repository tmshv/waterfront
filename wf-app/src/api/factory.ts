import { FeatureSettingsDto, FeatureCollectionDto } from './types'
import { IFeatureSettings, IFeatureProperties } from '../app/types'
import { Point, Feature } from 'geojson'

export function createFeatureSettingsList(dto: FeatureSettingsDto[]): IFeatureSettings[] {
    return dto.map(x => ({
        color: x.color,
        createdBy: x.created_by,
        createdOn: new Date(x.created_on),
        fieldTarget: x.field_target,
        fieldValue: x.field_value,
        id: x.id,
    }))
}

export function createFeaturePointList(dto: FeatureCollectionDto): Feature<Point, IFeatureProperties>[] {
    return dto.features.map((f, i) => ({
        ...f,
        properties: {
            id: `feature-${i}`,
            actorType: f.properties.actorType,
            city: f.properties.city,
            name: f.properties.name,
            previewImage: f.properties.previewImage,
            projectType: f.properties.projectType,
            short: f.properties.short,
            slug: f.properties.slug,
            year: f.properties.year,
        }
    }))
}
