import { useMedia } from 'react-use'

export function useColumns() {
    const isMobile = useMedia('(max-width: 31.25em)')
    const isThin = useMedia('(max-width: 800px)')
    const isLaptop = useMedia('(max-width: 1280px)')

    if (isMobile) {
        return 1
    } else if (isThin) {
        return 2
    } else if (isLaptop) {
        return 3
    } else {
        return 4
    }
}
