import React from 'react'
import Map from '../src/components/Map'
import MapLegend from '../src/components/MapLegend'
import { getFeatureSettings } from '../src/api'

export default class Index extends React.Component {
    static async getInitialProps() {
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

        const actorTypes = featureSettings
            .filter(x => x.field_target === 'actor_type')
            .map(x => ({
                color: x.color,
                type: 'actorType',
                name: translation[x.field_value]
            }))
        const projectTypes = featureSettings
            .filter(x => x.field_target === 'project_type')
            .map(x => ({
                color: x.color,
                type: 'projectType',
                name: translation[x.field_value],
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
                items: actorTypes,
            },
            {
                title: 'Project Type',
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

    render() {
        console.log(this.props.config)

        return (
            <div>
                <Map />

                <div className={'wrapper'}>
                    <MapLegend
                        data={this.props.config.legend}
                    />
                </div>
            </div>
        )
    }
}