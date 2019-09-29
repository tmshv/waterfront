import { IFeatureSettings } from './types'

export function createColorMap(featureSettings: IFeatureSettings[]): Map<string, string> {
    return featureSettings.reduce(
        (map, item) => map.set(
            `${item.fieldTarget}.${item.fieldValue}`,
            item.color
        ),
        new Map<string, string>(),
    )
}
