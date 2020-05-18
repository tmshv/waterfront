import { createContext } from 'react'
import { menu } from 'src/app/const'

export interface IMenuItem {
    url: string
    name: string
}

export const MenuContext = createContext(menu)
