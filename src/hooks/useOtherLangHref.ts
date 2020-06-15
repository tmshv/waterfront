import { useRouter } from 'next/router'
import { LangContext } from 'src/context/lang'
import { useContext } from 'react'
import { changeLangPathSuffix } from '@/lib/lang'

export function useOtherLangHref() {
    const { lang } = useContext(LangContext)
    const router = useRouter()
    const otherLang = lang === 'en' ? 'ru' : 'en'

    return changeLangPathSuffix(otherLang, router.asPath)
}
