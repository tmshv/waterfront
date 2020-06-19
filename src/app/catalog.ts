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

export const getProjectCards = async (lang: Lang) => {
    return getPagesByTag(lang, ['project'], {
        omitContent: true,
        sort: (a, b) => {
            if (a.year && b.year) {
                return b.year - a.year
            }

            return -1
        }
    })
}
