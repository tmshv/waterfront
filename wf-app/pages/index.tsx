import * as React from 'react'
import Map from '../src/components/Map'
import { MapLegend } from '../src/components/MapLegend'
import { Menu } from '../src/components/Menu'
import { getFeatureSettings, getFeatures } from '../src/api'
import legendReducer, { LegendAction } from '../src/app/reducers/legendReducer'
import { filterFeatureSettingsByFieldType, guardPaintColors, createLayerPaint, isLayerVisible } from '../src/app/map'
import { NextPage } from 'next'
import { useTranslation, withTranslation } from '../src/i18n'
import { IFeatureSettings, ILegendBlock, ILegend } from '../src/app/types'
import { TFunction } from 'next-i18next'
import { LEGEND_BLOCKS_UPDATE } from '../src/app/actions'
import { useLegend } from '../src/hooks/useLegend'

const Content = props => (
    <div className={'content'}>
        <style jsx>{`
            .content {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                pointer-events: none;
            }

            .head {
                pointer-events: auto;
            }

            .body {
                width: 35%;
                min-width: 200px;
                max-width: 250px;

                pointer-events: auto;
            }
        `}</style>

        <div className={'head'}>
            {props.head}
        </div>

        <div className={'body'}>
            {props.children}
        </div>
    </div>
)

interface IProps {
    featureSettings: IFeatureSettings[]
    features: any
}

const Index: NextPage<IProps> = props => {
    const [legend, dispatchConfig] = useLegend(props.featureSettings)

    const saintPetersburgBounds = [
        [29.56453961226603, 59.77965770830431],
        [30.671368054481917, 60.142457987352316],
    ]

    const center = [30.344087, 59.932924]
    const zoom = 11

    const options = {
        map: {
            center,
            zoom,
            attributionControl: false,
            // maxBounds: saintPetersburgBounds,
        },
        attribution: {
            customAttribution: [
                '<a href="https://unit4.io" target="_blank">design::unit</a>',
            ].join(''),
            compact: true,
        }
    }

    const features = props.features
    const sources = [
        {
            id: 'features',
            type: 'geojson',
            data: features,
        },
    ]

    const actorTypeColors = filterFeatureSettingsByFieldType(props.featureSettings, 'actor_type')
    const actorTypeBlock = legend.blocks.find(x => x.type === 'actorType')!
    const actorTypeVisible = actorTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = isLayerVisible(item.id, legend.visible)

        return acc
    }, {})

    const projectTypeColors = filterFeatureSettingsByFieldType(props.featureSettings, 'project_type')
    const projectTypeBlock = legend.blocks.find(x => x.type === 'projectType')!
    const projectTypeVisible = projectTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = isLayerVisible(item.id, legend.visible)

        return acc
    }, {})

    const isFeatureVisible = feature => {
        const projectType = projectTypeVisible[feature.properties.projectType]
        const actorType = actorTypeVisible[feature.properties.actorType]

        return projectType && actorType
    }

    const createLayerId = (feature, prefix) => `${feature.properties.id}-${prefix}`
    const createLayer = (feature, type, radius, colors) => {
        const id = feature.properties.id
        const layerId = createLayerId(feature, type)

        return {
            id: layerId,
            visible: isFeatureVisible(feature),
            source: 'features',
            type: 'circle',
            paint: createLayerPaint(type, radius, guardPaintColors(colors)),
            filter: ['==', 'id', id]
        }
    }

    const layers = features.features
        .map((feature: any) => {
            return [
                {
                    visible: isFeatureVisible(feature),
                    id: createLayerId(feature, 'shadow'),
                    source: 'features',
                    filter: ['==', 'id', feature.properties.id],
                    type: 'circle',
                    paint: {
                        "circle-color": "black",
                        "circle-opacity": 1,
                        "circle-blur": 0.75,
                        "circle-radius": 17
                    }
                },
                createLayer(feature, 'actorType', 14, actorTypeColors),
                createLayer(feature, 'projectType', 7, projectTypeColors),
            ]
        })
        .flat()

    return (
        <div>
            <Map
                mapOptions={options}
                sources={sources}
                layers={layers}
            />

            <Content
                head={(
                    <Menu />
                )}
            >
                <MapLegend
                    data={legend}
                    onChangeItemSelected={dispatchConfig}
                />
            </Content>
        </div>
    )
}

Index.getInitialProps = async () => {
    const featureSettings = await getFeatureSettings()
    const features = await getFeatures('saint_petersburg')

    return {
        featureSettings,
        features,
    }
}

export default withTranslation('common')(Index as any)
