import { Marker, Popup } from 'react-map-gl'
import { ViewState } from 'react-map-gl/src/mapbox/mapbox'
import { Feature, Point } from 'geojson'
import { MapGL, OnChangeViewport } from '@/components/MapGL'
import { isLayerVisible } from '@/app/map'
import { IFeatureProperties, AppPointFeature, ILegend } from '@/app/types'
import { createColorMap } from '@/app/featureSettings'
import { FeaturePreview } from '@/components/FeaturePreview'
import { useLanguage } from '@/hooks/useLanguage'
import { useMapStyle } from '@/hooks/useMapStyle'
import { useContext, useState } from 'react'
import { MapContext } from '@/context/map'
import { SvgCircles } from './SvgCircles'

type Props = {
    features: AppPointFeature[]
    legend: ILegend
    viewport: ViewState
    onChangeViewport: OnChangeViewport
}

export const WaterfontMap: React.FC<Props> = props => {
    const { featureSettings } = useContext(MapContext)
    const lang = useLanguage()
    const colorMap = createColorMap(featureSettings)
    const [selectedFeatureId, setSelectedFeatureId] = useState<string | undefined>(undefined)

    const key = 'BANyZrASqDKOtn6kEAe9'
    const mapStyle = useMapStyle(key)

    const actorTypeBlock = props.legend.blocks.find(x => x.type === 'actorType')!
    const actorTypeVisible = actorTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = isLayerVisible(item.id, props.legend.visible)

        return acc
    }, {})

    const projectTypeBlock = props.legend.blocks.find(x => x.type === 'projectType')!
    const projectTypeVisible = projectTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = isLayerVisible(item.id, props.legend.visible)

        return acc
    }, {})

    const isFeatureVisible = (feature: Feature<Point, IFeatureProperties>) => {
        const projectType = projectTypeVisible[feature.properties.projectType]
        const actorType = actorTypeVisible[feature.properties.actorType]

        return projectType && actorType
    }

    const selectedFeature = props.features.find(f => f.properties.id === selectedFeatureId)
    const features = props.features
        .filter(isFeatureVisible)
        .map(f => ({
            ...f,
            id: f.properties.slug,
            properties: {
                color1: colorMap.get(`actor_type.${f.properties.actorType}`)!,
                color2: colorMap.get(`project_type.${f.properties.projectType}`)!,
            }
        }))

    return (
        <MapGL
            mapStyle={mapStyle}
            viewport={props.viewport}
            onChangeViewport={props.onChangeViewport}
            onClickMap={coord => {
                setSelectedFeatureId(undefined)
            }}
        >
            {features.map((f, i) => (
                <Marker
                    key={i}
                    longitude={f.geometry.coordinates[0]}
                    latitude={f.geometry.coordinates[1]}
                >
                    <SvgCircles
                        size={32}
                        value={f.id ? `${f.id}` : undefined}
                        onClick={setSelectedFeatureId}
                    >
                        {[
                            {
                                size: 32,
                                color: f.properties.color1,
                            },
                            {
                                size: 16,
                                color: f.properties.color2,
                            },
                        ]}
                    </SvgCircles>
                </Marker>
            ))}
            {!selectedFeature ? null : (
                <Popup
                    // key={`${lang}.${city}.${selectedFeature.properties.id}`}
                    key={`${lang}.${selectedFeature.properties.slug}`}
                    tipSize={5}
                    anchor={'top'}
                    longitude={selectedFeature.geometry.coordinates[0]}
                    latitude={selectedFeature.geometry.coordinates[1]}
                    closeOnClick={false}
                >
                    <FeaturePreview
                        href={selectedFeature.properties.href}
                        title={selectedFeature.properties.title}
                        body={selectedFeature.properties.excerpt}
                        year={selectedFeature.properties.year}
                        previewImageSrc={selectedFeature.properties.cover}
                    />
                </Popup>
            )}
        </MapGL>
    )
}
