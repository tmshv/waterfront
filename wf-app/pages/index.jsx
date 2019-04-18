import React, { useReducer } from 'react'
import Map from '../src/components/Map'
import MapLegend from '../src/components/MapLegend'
import { getFeatureSettings, getFeatures } from '../src/api'
import configReducer from '../src/app/reducers/configReducer'
import { filterFeatureSettingsByFieldType, guardPaintColors, createLayerPaint } from '../src/app/map';

const Index = (props) => {
    console.log(props)

    const [config, setConfig] = useReducer(configReducer, props.config)
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

    const features = config.features
    const sources = [
        {
            id: 'features',
            type: 'geojson',
            data: features,
        },
    ]

    const actorTypeColors = filterFeatureSettingsByFieldType(config.featureSettings, 'actor_type')
    const actorTypeBlock = config.legend.find(x => x.type === 'actorType')
    const actorTypeVisible = actorTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = item.checked

        return acc
    }, {})

    const projectTypeColors = filterFeatureSettingsByFieldType(config.featureSettings, 'project_type')
    const projectTypeBlock = config.legend.find(x => x.type === 'projectType')
    const projectTypeVisible = projectTypeBlock.items.reduce((acc, item) => {
        acc[item.type] = item.checked

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
        .map(feature => {
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

            <div className={'wrapper'}>
                <MapLegend
                    data={config.legend}
                    onChangeItemSelected={setConfig}
                />
            </div>
        </div>
    )
}

Index.getInitialProps = async () => {
    const featureSettings = await getFeatureSettings()
    const features = await getFeatures('saint_petersburg')
    const translation = {
        'art_intervention': 'Art Intervention',
        'urban_intervention': 'Urban Intervention',
        'installation': 'Installation',
        'public_research': 'Public Research',
        'private_research': 'Private Research',
        'academic_research': 'Academic Research',
        'private_project': 'Private Project',
        'public_project': 'Public Project',
        'academic_project': 'Academic Project',

        'complex': 'Complex',
        'scientist': 'Scientists',
        'artist': 'Artists',
        'developer': 'Developers',
        'authority': 'Authorities',
        'designer': 'Designers',
        'activist': 'Activists',
    }

    const defaultChecked = true
    const actorTypes = featureSettings
        .filter(x => x.field_target === 'actor_type')
        .map(x => ({
            color: x.color,
            type: x.field_value,
            name: translation[x.field_value],
            checked: defaultChecked,
        }))
    const projectTypes = featureSettings
        .filter(x => x.field_target === 'project_type')
        .map(x => ({
            color: x.color,
            type: x.field_value,
            name: translation[x.field_value],
            checked: defaultChecked,
        }))

    const legend = [
        // {
        //     title: 'Placement',
        //     items: [
        //         {
        //             color: '#871811',
        //             type: 'placementType',
        //             name: 'конструкции на воде',
        //         },
        //         {
        //             color: '#5e3c23',
        //             type: 'placementType',
        //             name: 'намыв',
        //         },
        //         {
        //             color: '#59070c',
        //             type: 'placementType',
        //             name: 'на воде',
        //         },
        //         {
        //             color: '#272d63',
        //             type: 'placementType',
        //             name: 'на берегу',
        //         },
        //         {
        //             color: '#016661',
        //             type: 'placementType',
        //             name: 'прибрежные комплексы',
        //         },
        //     ],
        // },
        {
            title: 'Actor Type',
            type: 'actorType',
            items: actorTypes,
        },
        {
            title: 'Project Type',
            type: 'projectType',
            items: projectTypes,
        },
    ]

    return {
        config: {
            featureSettings,
            features,
            legend,
        },
    }
}

export default Index