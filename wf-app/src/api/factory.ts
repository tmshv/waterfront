import { FeatureSettingsDto, FeatureCollectionDto, FeatureDto } from './types'
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
    return dto.features.map(createPointFeature)
}

export function createFeature(dto: FeatureCollectionDto): Feature<Point, IFeatureProperties> {
    const feature = dto.features[0]

    return createPointFeature(feature)
}

function createPointFeature(dto: FeatureDto): Feature<Point, IFeatureProperties> {
    return {
        ...dto,
        properties: {
            id: `feature-${dto.properties.slug}`,
            actorType: dto.properties.actorType,
            city: dto.properties.city,
            name: dto.properties.name,
            previewImage: dto.properties.previewImage,
            projectType: dto.properties.projectType,
            short: dto.properties.short,
            slug: dto.properties.slug,
            year: dto.properties.year,
            content: dto.properties.content,
        }
    }
}
