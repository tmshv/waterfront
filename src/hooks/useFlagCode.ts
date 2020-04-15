import * as React from 'react'
import { useLanguage } from './useLanguage'

export function useFlagCode(fallback: string): string {
    const lang = useLanguage()
    const codeRef = React.useRef(new Map([
        ['ru', 'ru'],
        ['en', 'gb'],
    ]))
    const value = codeRef.current.get(lang)

    return value ? value : fallback
}
