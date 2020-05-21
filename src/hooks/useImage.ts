import { IRect } from 'src/lib/types'

function resizeImage(src: string, options: IRect): string {
    return src
    // return `https://images.weserv.nl/?url=${src}&w=${options.w}&h=${options.h}&n=-1`
}

export function useImage(src: string, size: IRect): string | undefined {
    return resizeImage(`${src}`, size)
}
