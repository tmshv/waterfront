import * as React from 'react'
import { Feature, Point } from 'geojson'
import ReactMapGL, { ViewState, Marker } from 'react-map-gl'
import { SvgCircles } from './SvgCircles'
import { IMapFeatureProperties } from './types'

export interface IMapProps {
    features: Feature<Point, IMapFeatureProperties>[]
    mapStyle: string | object
    // sources: any[]
    // layers: any[]
    viewport: ViewState
    onChangeViewport: (viewport: ViewState) => void
}

export const Map: React.FC<IMapProps> = props => {
    return (
        <ReactMapGL
            {...props.viewport}
            width={'100%'}
            height={'100%'}
            mapStyle={props.mapStyle}
            onViewportChange={props.onChangeViewport}

            // ref={mapRef}
            // scrollZoom={props.scrollZoom}
            // onLoad={() => {
            //     props.onLoad((mapRef.current as any).getMap())
            // }}
            // mapboxApiAccessToken={props.mapboxToken}
            // onClick={props.onClick}
            // onMouseMove={props.onMouseMove}
            attributionControl={false}
        >
            {props.features.map((x, i) => (
                <Marker
                    key={i}
                    longitude={x.geometry.coordinates[0]}
                    latitude={x.geometry.coordinates[1]}
                >
                    <SvgCircles
                        size={32}
                    >
                        {[
                            {
                                size: 32,
                                color: x.properties.color1,
                            },
                            {
                                size: 16,
                                color: x.properties.color2,
                            },
                        ]}
                    </SvgCircles>
                </Marker>
            ))}
        </ReactMapGL>
    )
}
