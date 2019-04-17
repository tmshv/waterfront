export function filterFeatureSettingsByFieldType(featureSettings, type) {
    return featureSettings
        .filter(x => x.field_target === type)
        .map(x => ({
            fieldTarget: x.field_target,
            fieldValue: x.field_value,
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