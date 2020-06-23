import { useTranslation } from 'src/hooks/useTranslation'
import { useContext } from 'react'
import { MenuContext } from '@/context/menu'
import { useLanguage } from '@/hooks/useLanguage'
import { changeLangPathSuffix } from '@/lib/lang'
import { useRouter } from 'next/router'

export function useMenuItems() {
    const router = useRouter()
    const { t } = useTranslation()
    const lang = useLanguage()
    const items = useContext(MenuContext)

    return items.map(item => {
        const href = changeLangPathSuffix(lang, item.url)

        return {
            href,
            label: t(item.name),
            isCurrent: router.asPath === href,
        }
    })
}
