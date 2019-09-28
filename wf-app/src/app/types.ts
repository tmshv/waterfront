export interface IArticle {
    url: string
    previewImage: string
    name: string
    short: string
    slug: string
    date?: Date
    body: string
}

export interface IFeatureSettings {
    color: string
    created_by: number
    created_on: number
    field_target: string
    field_value: string
    id: number
}

export interface ILegendBlock {
    title: string
    type: string
    items: ILegendItem[]
}

export interface ILegendItem {
    name: string
    type: string
    color: string

    checked: boolean
}
