import { useTranslation } from '../i18n'

export function useLanguage(): string {
    const { i18n } = useTranslation()
    return i18n.language
}
