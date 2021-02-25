import dynamic from 'next/dynamic'
import { NextPage, GetStaticProps } from 'next'
import { ViewState } from 'react-map-gl/src/mapbox/mapbox'
import { MapLegend } from '@/components/MapLegend'
import { useLegend } from '@/hooks/useLegend'
import { ICity } from '@/types'
import { useCity } from '@/hooks/useCity'
import { Select } from '@/components/Select'
import { AppLayout } from '@/components/AppLayout'
import { useState, useEffect, useMemo, useContext } from 'react'
import { MapContext, defaultMapOptions } from '@/context/map'
import { cities } from '@/app/const'
import { FeatureCollection } from 'geojson'
import { getFeatures } from '@/api'
import { AppPointFeature } from '@/app/types'

const WaterfontMap = dynamic(import('@/components/WaterfrontMap').then(m => m.WaterfontMap), {
    ssr: false,
})

interface IProps {
    cities: ICity[]
    features: {
        [name: string]: FeatureCollection
    }
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
    // const features = useFeatures(city.key)

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
                    features={props.features[city.key].features as any}
                    viewport={viewport}
                    onChangeViewport={v => setViewport(v)}
                />
            </AppLayout>
        </MapContext.Provider>
    )
}

type Props = {
    data: {
        [name: string]: FeatureCollection
    }
}

const Index: NextPage<Props> = props => (
    <MapContext.Provider value={defaultMapOptions}>
        <Main
            cities={[...cities.values()]}
            features={props.data as any}
        />
    </MapContext.Provider>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
    const spb = await getFeatures('ru', 'saint_petersburg')
    const oslo = await getFeatures('ru', 'oslo')
    const stockholm = await getFeatures('ru', 'stockholm')

    return {
        props: {
            data: {
                saint_petersburg: spb!,
                oslo: oslo!,
                stockholm: stockholm!,
            }
        }
    }
}

export default Index 
