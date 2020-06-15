import { useLanguage } from './useLanguage'

const code = new Map([
    ['ru', 'ru'],
    ['en', 'gb'],
])

export type UseFlagCodeOptions = {
    fallback: string
}

export function useFlagCode({ fallback }: UseFlagCodeOptions): string {
    const lang = useLanguage()
    const value = code.get(lang)

    return value ? value : fallback
}
