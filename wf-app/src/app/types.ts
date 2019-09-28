export interface IArticle {
    url: string
    previewImage: string
    name: string
    short: string
    slug: string
    date?: Date
    body: string
}

export interface ILegendItem {
    title: string
    type: string
    items: {
        name: string
        type: string
        color: string

        checked: boolean
    }[]
}
