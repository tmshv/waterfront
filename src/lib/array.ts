import { zip, chunk, remove, identity } from 'lodash'

export function arrayToGrid<T>(items: T[], columns: number): T[][] {
    return chunk(items, columns)
}

export function gridToColumns<T>(grid: T[][]): T[][] {
    return zip(...grid)
        .map(
            xs => remove(xs, identity)
        ) as unknown as T[][]
}
