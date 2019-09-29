import * as React from 'react'

import { NextPage } from 'next'
import { ViewState } from 'react-map-gl'
import { Feature, Point } from 'geojson'

import { Map } from '../src/components/Map'
import { MapLegend } from '../src/components/MapLegend'
import { Menu } from '../src/components/Menu'
import { getFeatureSettings, getFeatures } from '../src/api'
import { isLayerVisible } from '../src/app/map'
import { withTranslation } from '../src/i18n'
import { IFeatureSettings, IFeatureProperties } from '../src/app/types'
import { useLegend } from '../src/hooks/useLegend'
import { createColorMap } from '../src/app/featureSettings'

function createMaptilerStyle() {
    const key = 'BANyZrASqDKOtn6kEAe9'
    const mapName = 'positron'

    return `https://api.maptiler.com/maps/${mapName}/style.json?key=${key}`
}

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
                min-width: 300px;
                max-width: 350px;

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
    features: Feature<Point, IFeatureProperties>[]
}

const Index: NextPage<IProps> = props => {
    const [legend, dispatchLegend] = useLegend(props.featureSettings)
    const [viewport, setViewport] = React.useState<ViewState>({
        latitude: 59.932924,
        longitude: 30.344087,
        zoom: 11,
    })
    const colorMap = createColorMap(props.featureSettings)

    const actorTypeBlock = legend.blocks.find(x => x.type === 'actorType')!
    const actorTypeVisible = actorTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = isLayerVisible(item.id, legend.visible)

        return acc
    }, {})

    const projectTypeBlock = legend.blocks.find(x => x.type === 'projectType')!
    const projectTypeVisible = projectTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = isLayerVisible(item.id, legend.visible)

        return acc
    }, {})

    const isFeatureVisible = (feature: Feature<Point, IFeatureProperties>) => {
        const projectType = projectTypeVisible[feature.properties.projectType]
        const actorType = actorTypeVisible[feature.properties.actorType]

        return projectType && actorType
    }

    const mapFeatures = props.features
        .filter(isFeatureVisible)
        .map(f => ({
            ...f,
            properties: {
                color1: colorMap.get(`actor_type.${f.properties.actorType}`)!,
                color2: colorMap.get(`project_type.${f.properties.projectType}`)!,
            }
        }))

    return (
        <>
            <Map
                features={mapFeatures}
                mapStyle={createMaptilerStyle()}
                viewport={viewport}
                onChangeViewport={v => setViewport(v)}
            />

            <Content
                head={(
                    <Menu />
                )}
            >
                <MapLegend
                    data={legend}
                    onChangeItemSelected={dispatchLegend}
                />
            </Content>
        </>
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
