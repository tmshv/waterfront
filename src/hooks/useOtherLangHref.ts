import { useRouter } from 'next/router'
import { LangContext } from 'src/context/lang'
import { useContext } from 'react'

export function useOtherLangHref() {
    const { lang } = useContext(LangContext)
    const router = useRouter()

    return lang === 'ru' ? `${router.asPath}/en` : router.asPath.replace(/\/en$/, '')
}
