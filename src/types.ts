import { ViewState } from 'react-map-gl'
import { PageConfigProps } from './context/page'

export interface IEvent {
    id: number
    slug: string
    eventUrl: string
    content: string
    short: string
    name: string
    imageId: number
    date: Date
    href: string
}

export interface ICity {
    key: string
    title: string
    viewport: ViewState
}

export type PageMeta = {
    year?: number
    city?: string
}

export type PageDefinition = PageConfigProps & PageMeta & {
    content: string
    title: string | null
    date: string | null
    slug: string
    [name: string]: any
}

export type PageDescription = PageConfigProps & PageMeta & {
    title: string | null
    date: string | null
    slug: string
    [name: string]: any
}
