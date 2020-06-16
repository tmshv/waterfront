import { createContext } from 'react'
import { ISignal, BufferableSignal } from 'src/lib/Signal'

// let data = {}
// export const pageContextSignal = 

// export function setPageData(values: object) {
//     // console.log('setting', values)

//     pageContextSignal.trigger(values)

//     // data = {
//     //     ...data,
//     //     ...values,
//     // }
// }

export type PageConfigProps = {
    title: string
    cover: string
    excerpt: string
    tags: string[]
}

export const defaultPageConfig: PageConfigProps = {
    title: '',
    cover: '',
    excerpt: '',
    tags: [],
}

export const pageSignal: ISignal<PageConfigProps> = new BufferableSignal<PageConfigProps>()
export const PageContext = createContext<PageConfigProps>(defaultPageConfig)
export const PageSignalContext = createContext(pageSignal)
