export function filterFeatureSettingsByFieldType(featureSettings, type) {
    return featureSettings
        .filter(x => x.field_target === type)
        .map(x => [x.field_value, x.color])
        .flat()
}

export function guardPaintColors(colors) {
    return colors.length >= 2 ? colors : [
        `${Math.random()}`, 'black'
    ]
}

export function createLayerPaint(field, radius, colors) {
    return {
        "circle-color": [
            "match",
            ["get", field],
            ...colors,
        /* other */ 'black'
        ],
        "circle-opacity": 1,
        "circle-radius": radius
    }
}