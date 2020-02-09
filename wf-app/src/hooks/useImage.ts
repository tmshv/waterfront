import { useEffect, useState } from 'react'
import { getImageUrl } from 'src/app/api'

function isId(value: string | number) {
    if (typeof value === 'number') {
        return true
    }

    return /^([\d]+)$/.test(value)
}

export function useImage(param: string | number): string | undefined {
    const [src, setSrc] = useState<string>()

    useEffect(() => {
        let mouted = true
        if (!param) {
            return
        } else if (isId(param)) {
            (async () => {
                const image = await getImageUrl(Number(param))

                if (mouted) {
                    setSrc(image)
                }
            })()
        } else {
            setSrc(`${param}`)
        }

        return () => {
            mouted = false
        }
    }, [param])

    return src
}

