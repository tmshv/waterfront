import { ViewState } from 'react-map-gl'

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
