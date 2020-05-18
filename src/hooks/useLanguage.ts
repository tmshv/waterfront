import { useContext } from 'react'
import { LangContext } from 'src/context/lang'

export function useLanguage() {
    const { lang } = useContext(LangContext)

    return lang
}
