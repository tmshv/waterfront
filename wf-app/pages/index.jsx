import React from 'react'
import Map from '../src/components/Map'
import MapLegend from '../src/components/MapLegend'

export default () => (
    <div>
        <Map />

        <div className={'wrapper'}>
            <MapLegend/>
        </div>
    </div>
)
