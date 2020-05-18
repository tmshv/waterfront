import * as React from 'react'
import { ICity } from '../types'

export function useCity(cities: ICity[]): [ICity, React.Dispatch<React.SetStateAction<string>>] {
    const cityMap = new Map(cities.map(
        x => [x.key, x]
    ))
    const [cityKey, setCityKey] = React.useState<string>(cities[0].key)
    const city = cityMap.get(cityKey)!

    return [city, setCityKey]
}
