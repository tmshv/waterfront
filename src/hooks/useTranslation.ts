import { useContext } from 'react'
import { LangContext } from '../context/lang'

export function useTranslation() {
    const { dict } = useContext(LangContext)

    return {
        t: (value: string) => {
            if (value in dict) {
                return dict[value]
            }

            return value
        }
    }
}
