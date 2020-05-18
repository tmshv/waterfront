import { useRef } from 'react'
import { useLanguage } from './useLanguage'

export type UseFlagCodeOptions = {
    fallback: string
}

export function useFlagCode({ fallback }: UseFlagCodeOptions): string {
    const lang = useLanguage()
    const codeRef = useRef(new Map([
        ['ru', 'ru'],
        ['en', 'gb'],
    ]))
    const value = codeRef.current.get(lang)

    return value ? value : fallback
}
