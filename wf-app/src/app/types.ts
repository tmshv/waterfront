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
    createdBy: number
    createdOn: Date
    fieldTarget: string
    fieldValue: string
    id: number
}

export interface ILegendBlock {
    title: string
    type: string
    items: ILegendItem[]
}

export interface ILegend {
    blocks: ILegendBlock[]
    visible: {
        [name: string]: boolean
    }
}

export interface ILegendItem {
    id: string
    name: string
    type: string
    color: string
}
