import useSWR from 'swr'
import { AppPointFeature } from '../app/types'
import { useLanguage } from './useLanguage'

const fetcher = (url: string) => fetch(url)
    .then(r => r.json())
    .then(geojson => geojson.features)

export function useFeatures(city: string): AppPointFeature[] {
    const lang = useLanguage()
    const { data, error } = useSWR(`/api/features/${city}?lang=${lang}`, fetcher)

    return data ?? []
}
