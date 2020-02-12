import { useMedia } from 'react-use'

function createMaptilerStyle(key: string, mapName: string) {
    return `https://api.maptiler.com/maps/${mapName}/style.json?key=${key}`
}

export function useMapStyle(key: string) {
    const isDark = useMedia('(prefers-color-scheme: dark)')
    const name = isDark
        ? 'darkmatter'
        : 'positron'

    return createMaptilerStyle(key, name)
}
