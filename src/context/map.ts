import { createContext } from "react"
import { IFeatureSettings } from "@/app/types"

type MapContextType = {
    featureSettings: IFeatureSettings[]
}

export const defaultFeatureSettings: IFeatureSettings[] = [
    {
        fieldTarget: "actor_type",
        fieldValue: "artist",
        color: "#F19698",
    },
    {
        fieldTarget: "actor_type",
        fieldValue: "activist",
        color: "#9898CB",
    },
    {
        fieldTarget: "actor_type",
        fieldValue: "developer",
        color: "#FACB99",
    },
    {
        fieldTarget: "actor_type",
        fieldValue: "designer",
        color: "#EDCCE3",
    },
    {
        fieldTarget: "actor_type",
        fieldValue: "scientist",
        color: "#EB6568",
    },
    {
        fieldTarget: "actor_type",
        fieldValue: "authority",
        color: "#CDE3C2",
    },
    {
        fieldTarget: "actor_type",
        fieldValue: "complex",
        color: "#996767",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "art_intervention",
        color: "#009FDB",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "urban_intervention",
        color: "#2F46D1",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "installation",
        color: "#9F1F80",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "public_research",
        color: "#E44892",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "private_research",
        color: "#E21D2F",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "academic_research",
        color: "#EC7C23",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "public_project",
        color: "#99BC36",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "private_project",
        color: "#FFE800",
    },
    {
        fieldTarget: "project_type",
        fieldValue: "academic_project",
        color: "#009447",
    }
]

export const defaultMapOptions: MapContextType = {
    featureSettings: defaultFeatureSettings,
}

export const MapContext = createContext<MapContextType>(defaultMapOptions)
