import { useTranslation } from 'src/hooks/useTranslation'
import { useContext } from 'react'
import { MenuContext } from '@/context/menu'
import { useLanguage } from '@/hooks/useLanguage'
import { changeLangPathSuffix } from '@/lib/lang'

export function useMenuItems() {
    const { t } = useTranslation()
    const lang = useLanguage()
    const items = useContext(MenuContext)

    return items.map(item => ({
        href: changeLangPathSuffix(lang, item.url),
        label: t(item.name),
    }))
}
