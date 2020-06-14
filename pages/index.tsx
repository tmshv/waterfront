import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { ViewState } from 'react-map-gl'
import { MapLegend } from '@/components/MapLegend'
import { useLegend } from '@/hooks/useLegend'
import { ICity } from '@/types'
import { useCity } from '@/hooks/useCity'
import { Select } from '@/components/Select'
import { AppLayout } from '@/components/AppLayout'
import { useState, useEffect, useMemo, useContext } from 'react'
import { MapContext, defaultMapOptions } from '@/context/map'
import { useFeatures } from '@/hooks/useFeatures'

const WaterfontMap = dynamic(import('@/components/WaterfrontMap').then(m => m.WaterfontMap), {
    ssr: false,
})

interface IProps {
    cities: ICity[]
}

const Main: React.FC<IProps> = props => {
    const { featureSettings } = useContext(MapContext)
    const cityOptions = useMemo(
        () => props.cities
            .map(x => ({
                value: x.key,
                label: x.title,
            })),
        [props.cities],
    )

    const [city, setCity] = useCity(props.cities)
    const [legend, dispatchLegend] = useLegend(featureSettings)
    const [viewport, setViewport] = useState<ViewState>(city.viewport)
    const features = useFeatures(city.key)

    useEffect(() => {
        setViewport(city.viewport)
    }, [city])

    return (
        <MapContext.Provider value={defaultMapOptions}>
            <AppLayout
                side={(
                    <>
                        <Select
                            onChange={value => {
                                setCity(value)
                            }}
                            value={city.key}
                            options={cityOptions}
                        />
                        <MapLegend
                            data={legend}
                            onChangeItemSelected={dispatchLegend}
                        />
                    </>
                )}
            >
                <WaterfontMap
                    legend={legend}
                    features={features}
                    viewport={viewport}
                    onChangeViewport={v => setViewport(v)}
                />
            </AppLayout>
        </MapContext.Provider>
    )
}
const Index: NextPage<IProps> = props => (
    <MapContext.Provider value={defaultMapOptions}>
        <Main {...props} />
    </MapContext.Provider>
)

Index.getInitialProps = async () => {
    const cities: ICity[] = [
        {
            key: 'saint_petersburg',
            title: 'Saint Petersburg',
            viewport: {
                latitude: 59.932924,
                longitude: 30.344087,
                zoom: 11,
            }
        },
        {
            key: 'stockholm',
            title: 'Stockholm',
            viewport: {
                latitude: 59.32477835068242,
                longitude: 18.071174590117273,
                zoom: 12,
            }
        },
        {
            key: 'oslo',
            title: 'Oslo',
            viewport: {
                latitude: 59.912112881280706,
                longitude: 10.741096809260386,
                zoom: 12,
            }
        },
    ]

    return {
        cities,
    }
}

export default Index 
