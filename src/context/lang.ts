import { createContext } from 'react'
import { Lang } from 'src/api'

export type LangContextType = {
    lang: Lang,
    dict: {
        [name: string]: string
    }
}

export const LangContext = createContext<LangContextType>({
    lang: 'ru',
    dict: {},
})
