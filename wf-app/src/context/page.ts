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
    cover: string
    excerpt: string
}

export const defaultPageConfig: PageConfigProps = {
    cover: '',
    excerpt: '',
}

export const pageSignal: ISignal<PageConfigProps> = new BufferableSignal<PageConfigProps>()
export const PageContext = createContext<PageConfigProps>(defaultPageConfig)
export const PageSignalContext = createContext(pageSignal)
