import { Lang, getPagesByTag } from 'src/api'

export const getCatalogCards = async (lang: Lang) => {
    return getPagesByTag(lang, ['feature'], {
        omitContent: true,
        sort: (a, b) => {
            if (a.year && b.year) {
                return b.year - a.year
            }

            return -1
        }
    })
}
