export function includes<T>(superset: Set<T>, subset: Set<T>): boolean {
    return Array
        .from(subset.values())
        .reduce((ok, x) => {
            return ok && superset.has(x)
        }, true)
}
