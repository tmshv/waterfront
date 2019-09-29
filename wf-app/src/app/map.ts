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

export function isLayerVisible(id: string, index: { [id: string]: boolean }) {
    return id in index
        ? index[id]
        : true
}