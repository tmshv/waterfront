export function isLayerVisible(id: string, index: { [id: string]: boolean }) {
    return id in index
        ? index[id]
        : true
}