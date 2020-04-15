import { Feature, Point } from "geojson";

export interface IArticle {
    url: string
    previewImage: string
    name: string
    short: string
    slug: string
    date?: Date
    body: string
}

export interface IPerson {
    content: string
    name: string
    previewImage: string
    role: 'partner' | 'expert' | 'team'
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

export interface IFeatureProperties {
    id: string
    actorType: string
    city: string
    name: string
    previewImage: string
    projectType: string
    short: string
    slug: string
    year: number
    content?: string
}

export type AppPointFeature = Feature<Point, IFeatureProperties>
