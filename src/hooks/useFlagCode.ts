import { useRouter } from 'next/router'

const code = new Map([
    ['ru', 'ru'],
    ['en', 'gb'],
])

export type UseFlagCodeOptions = {
    fallback: string
}

export function useFlagCode({ fallback }: UseFlagCodeOptions): string {
    const router = useRouter()

    const value = code.get(router.locale!)

    return value ? value : fallback
}
