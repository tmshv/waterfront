import { useEffect, useState } from 'react'
import { getImageUrl } from 'src/app/api'

export function useImage(param: string | number): string | undefined {
    const [src, setSrc] = useState<string>()

    useEffect(() => {
        let mouted = true
        if (!param) {
            return
        } else if (typeof param === 'string') {
            setSrc(param)
        } else {
            (async () => {
                const image = await getImageUrl(param)
                
                if (mouted) {
                    setSrc(image)
                }
            })()
        }

        return () => {
            mouted = false
        }
    }, [param])

    return src
}

