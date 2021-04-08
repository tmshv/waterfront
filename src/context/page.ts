import { createContext } from 'react'

export type PageConfigProps = {
    title: string | null
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

export const PageContext = createContext<PageConfigProps>(defaultPageConfig)
