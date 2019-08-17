import { gridToColumns, arrayToGrid } from '../../lib/array'

export function splitIntoColumns<T>(items: T[], size: number): T[][]{
    return gridToColumns(
        arrayToGrid(items, size)
    )
}
