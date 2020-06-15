export function changeLangPathSuffix(lang: string, path: string): string {
    if (lang === 'ru') {
        const newPath = path.replace(/\/en$/, '')
        if (newPath === '') {
            return '/'
        }

        return newPath
    }

    if (path === '/') {
        return '/en'
    }

    return `${path}/en`
}
