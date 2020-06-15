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
    fieldTarget: string
    fieldValue: string
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
    href: string
    actorType: string
    city: string
    title: string
    cover: string
    projectType: string
    excerpt: string
    slug: string
    year: number
    content?: string
}

export type AppPointFeature = Feature<Point, IFeatureProperties>
