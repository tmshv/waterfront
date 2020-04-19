import { useContext } from 'react'
import { LangContext } from 'src/context/lang'

export function useLanguage() {
    return useContext(LangContext)
}
