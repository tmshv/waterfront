import * as React from 'react'

import { AppPointFeature } from '../app/types'
import { useLanguage } from './useLanguage'
import { getFeatures } from '../app/api'

export function useFeatures(city: string): AppPointFeature[] {
    const lang = useLanguage()
    const [features, setFeatures] = React.useState<AppPointFeature[]>([])

    React.useEffect(() => {
        (async () => {
            const features = await getFeatures(lang, city)

            setFeatures(features)
        })()
    }, [lang, city])

    return features
}
