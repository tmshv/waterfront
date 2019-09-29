import { IFeatureSettings } from './types'

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

export function createColorMap(featureSettings: IFeatureSettings[]): Map<string, string> {
    return featureSettings.reduce(
        (map, item) => map.set(
            `${item.fieldTarget}.${item.fieldValue}`,
            item.color
        ),
        new Map<string, string>(),
    )
}
