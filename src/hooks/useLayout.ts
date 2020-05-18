import { useMobile } from './useMobile'

export function useLayout() {
    const isMobile = useMobile()

    return !isMobile ? 'horizontal' : 'vertical'
}
