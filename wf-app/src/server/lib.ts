export function createApiUrl(path: string) {
    const baseUrl = 'https://wf.tmshv.com'

    return baseUrl + path
}

export function resolveLangField(obj: any, key: string, langs: string[]): string {
    for (const lang of langs) {
        const langKey = `${key}_${lang}`

        if (obj[langKey]) {
            return `${obj[langKey]}`
        }
    }

    return ''
}

export function getLangPriorityOrder(defaultLang: string): string[] {
    if (defaultLang === 'en') {
        return ['en', 'ru']
    }

    return ['ru', 'en']
}