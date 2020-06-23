import { useMedia } from 'react-use'

export function useMobile() {
    return useMedia('screen and (max-width: 900px)')
}
