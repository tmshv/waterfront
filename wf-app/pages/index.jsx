import React, {useReducer} from 'react'
import Map from '../src/components/Map'
import MapLegend from '../src/components/MapLegend'
import { getFeatureSettings } from '../src/api'
import configReducer from '../src/app/reducers/configReducer'

const Index = (props) => {
    const [config, setConfig] = useReducer(configReducer, props.config)

    return (
        <div>
            <Map />

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
    // const actorTypeColors = filterFeatureSettingsByFieldType(featureSettings, 'actor_type')
    // const projectTypeColors = filterFeatureSettingsByFieldType(featureSettings, 'project_type')

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
            legend,
        },
    }
}

export default Index