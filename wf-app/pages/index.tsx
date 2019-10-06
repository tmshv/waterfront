import * as React from 'react'

import { NextPage } from 'next'
import { ViewState, Popup } from 'react-map-gl'
import { Feature, Point } from 'geojson'
import Select from 'react-select'

import { MapGL } from '../src/components/MapGL'
import { MapLegend } from '../src/components/MapLegend'
import { Menu } from '../src/components/Menu'
import { getFeatureSettings } from '../src/app/api'
import { isLayerVisible } from '../src/app/map'
import { withTranslation, useTranslation } from '../src/i18n'
import { IFeatureSettings, IFeatureProperties } from '../src/app/types'
import { useLegend } from '../src/hooks/useLegend'
import { createColorMap } from '../src/app/featureSettings'
import { FeaturePreview } from '../src/components/FeaturePreview'
import { createUrl } from '../src/app/feature'
import { useFeatures } from '../src/hooks/useFeatures'
import { useLanguage } from '../src/hooks/useLanguage'
import { ICity } from '../src/types'
import { useCity } from '../src/hooks/useCity'

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
    cities: ICity[]
}

const Index: NextPage<IProps> = props => {
    const { t } = useTranslation()
    const lang = useLanguage()
    const cityOptions = React.useMemo(
        () => Array
            .from(props.cities.values())
            .map(x => ({
                value: x.key,
                label: t(x.title),
            })),
        [props.cities, lang],
    )

    const [city, setCity] = useCity(props.cities)
    const features = useFeatures(city.key)
    const [legend, dispatchLegend] = useLegend(props.featureSettings)
    const [viewport, setViewport] = React.useState<ViewState>(city.viewport)
    const [selectedFeatureId, setSelectedFeatureId] = React.useState<string | undefined>(undefined)
    const colorMap = createColorMap(props.featureSettings)

    React.useEffect(() => {
        setViewport(city.viewport)
    }, [city])

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

    const selectedFeature = features.find(f => f.properties.id === selectedFeatureId)
    const mapFeatures = features
        .filter(isFeatureVisible)
        .map(f => ({
            ...f,
            id: f.properties.id,
            properties: {
                color1: colorMap.get(`actor_type.${f.properties.actorType}`)!,
                color2: colorMap.get(`project_type.${f.properties.projectType}`)!,
            }
        }))

    return (
        <>
            <MapGL
                features={mapFeatures}
                mapStyle={createMaptilerStyle()}
                viewport={viewport}
                onChangeViewport={v => setViewport(v)}
                onClickMap={coord => {
                    console.log('click coord', coord)

                    setSelectedFeatureId(undefined)
                }}
                onClickFeature={id => {
                    setSelectedFeatureId(id)
                }}
            >
                {!selectedFeature ? null : (
                    <Popup
                        key={`${lang}.${city}.${selectedFeature.properties.id}`}
                        tipSize={5}
                        anchor={'top'}
                        longitude={selectedFeature.geometry.coordinates[0]}
                        latitude={selectedFeature.geometry.coordinates[1]}
                        closeOnClick={false}
                    >
                        <FeaturePreview
                            href={createUrl(selectedFeature.properties.slug)}
                            title={selectedFeature.properties.name}
                            body={selectedFeature.properties.short}
                            year={selectedFeature.properties.year}
                            previewImageSrc={selectedFeature.properties.previewImage}
                        />
                    </Popup>
                )}
            </MapGL>

            <Content
                head={(
                    <Menu />
                )}
            >
                <div>
                    <style jsx>{`
                        div {
                            padding: 15px;
                        }
                    `}</style>

                    <Select
                        onChange={(value: any) => {
                            setCity(value.value)
                        }}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: 'rgb(90, 200, 240)',
                                primary: 'rgb(0, 83, 108)',
                            },
                        })}
                        styles={{
                            container: style => ({
                                ...style,
                                marginBottom: 15,
                            }),
                            control: style => ({
                                ...style,
                                borderRadius: 0,
                                borderColor: 'white',
                            })
                        }}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={city.key}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={false}
                        name="color"
                        options={cityOptions}
                    />
                    <MapLegend
                        data={legend}
                        onChangeItemSelected={dispatchLegend}
                    />
                </div>
            </Content>
        </>
    )
}

Index.getInitialProps = async () => {
    const featureSettings = await getFeatureSettings()
    const cities: ICity[] = [
        {
            key: 'saint_petersburg',
            title: 'Saint Petersburg',
            viewport: {
                latitude: 59.932924,
                longitude: 30.344087,
                zoom: 11,
            }
        },
        {
            key: 'stockholm',
            title: 'Stockholm',
            viewport: {
                latitude: 59.32477835068242,
                longitude: 18.071174590117273,
                zoom: 12,
            }
        },
        {
            key: 'oslo',
            title: 'Oslo',
            viewport: {
                latitude: 59.912112881280706,
                longitude: 10.741096809260386,
                zoom: 12,
            }
        },
    ]

    return {
        cities,
        featureSettings,
    }
}

export default withTranslation('common')(Index as any)
