import * as React from 'react'
import { useTranslation } from '../i18n'
import { ILegend, IFeatureSettings } from '../app/types'
import legendReducer, { LegendAction } from '../app/reducers/legendReducer'
import { TFunction } from 'next-i18next'

function createLegend(featureSettings: IFeatureSettings[], t: TFunction): ILegend {
    const actorTypes = featureSettings
        .filter(x => x.fieldTarget === 'actor_type')
        .map(x => ({
            id: `actor_type.${x.fieldValue}`,
            color: x.color,
            type: x.fieldValue,
            name: t(x.fieldValue),
        }))
    const projectTypes = featureSettings
        .filter(x => x.fieldTarget === 'project_type')
        .map(x => ({
            id: `project_type.${x.fieldValue}`,
            color: x.color,
            type: x.fieldValue,
            name: t(x.fieldValue),
        }))

    return {
        visible: {},
        blocks: [
            {
                title: t('Actor Type'),
                type: 'actorType',
                items: actorTypes,
            },
            {
                title: t('Project Type'),
                type: 'projectType',
                items: projectTypes,
            },
        ]
    }
}

export function useLegend(featureSettings: IFeatureSettings[]): [ILegend, React.Dispatch<LegendAction>] { 
    const { t } = useTranslation()
    const newLegend = createLegend(featureSettings, t)

    const [l, dispatchLegend] = React.useReducer<React.Reducer<ILegend, LegendAction>>(
        legendReducer,
        newLegend,
    )

    const legend: ILegend = {
        ...newLegend,
        visible: l.visible
    }

    return [legend, dispatchLegend]
}
