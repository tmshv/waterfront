import { IFeatureSettings } from './types'

export function filterFeatureSettingsByFieldType(featureSettings: IFeatureSettings[], type) {
    return featureSettings
        .filter(x => x.fieldTarget === type)
        .map(x => ({
            fieldTarget: x.fieldTarget,
            fieldValue: x.fieldValue,
            color: x.color,
        }))
}

export function createMapboxColors(featureSettings) {
    return guardPaintColors(featureSettings
        .map(x => [x.fieldValue, x.color])
        .flat()
    )
}

function guardPaintColors(colors) {
    return colors.length >= 2 ? colors : [
        `${Math.random()}`, 'black'
    ]
}