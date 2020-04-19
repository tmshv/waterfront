import { createContext } from 'react'
import { Lang } from 'src/api'

export const LangContext = createContext<Lang>('ru')
