import { useEffect, useState } from 'react'
import { getImageUrl } from 'src/app/api'
import { IRect } from 'src/lib/types'

function isId(value: string | number) {
    if (typeof value === 'number') {
        return true
    }

    return /^([\d]+)$/.test(value)
}

function resizeImage(src: string, options: IRect): string {
    return `https://images.weserv.nl/?url=${src}&w=${options.w}&h=${options.h}&n=-1`
}

export function useImage(param: string | number, size: IRect): string | undefined {
    const [src, setSrc] = useState<string>()

    useEffect(() => {
        let mouted = true
        if (!param) {
            return
        } else if (isId(param)) {
            (async () => {
                const image = await getImageUrl(Number(param))

                if (mouted && image) {
                    setSrc(resizeImage(image, size))
                }
            })()
        } else {
            setSrc(resizeImage(`${param}`, size))
        }

        return () => {
            mouted = false
        }
    }, [param])

    return src
}

