import { useRouter } from 'next/router'

export function useOppositeLocale() {
    const router = useRouter()
    const otherLang = router.locales?.filter(x => x != router.locale)[0]!

    return [
        router.asPath,
        otherLang,
    ]
}
