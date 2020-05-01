import { useContext, useRef } from 'react'
import { LangContext } from '../context/lang'

export function useTranslation() {
    const { dict } = useContext(LangContext)
    const ref = useRef({
        t: (value: string) => {
            if (value in dict) {
                return dict[value]
            }

            return value
        }
    })

    return ref.current
}
