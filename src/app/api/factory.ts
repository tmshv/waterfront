import { FeatureCollectionDto, FeatureDto } from './types'
import { IFeatureProperties } from '../types'
import { Point, Feature } from 'geojson'
import { cleanText } from '../../lib/text'

export function createFeaturePointList(dto: FeatureCollectionDto): Feature<Point, IFeatureProperties>[] {
    return dto.features.map(createPointFeature)
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
            content: cleanText(dto.properties.content),
        }
    }
}
