import * as React from 'react'
import { Feature, Point } from 'geojson'
import ReactMapGL, { ViewState, Marker } from 'react-map-gl'
import { SvgCircles } from './SvgCircles'
import { IMapFeatureProperties } from './types'

type MapFeature = Feature<Point, IMapFeatureProperties>

export interface IMapGLProps {
    features: MapFeature[]
    mapStyle: string | object
    viewport: ViewState
    onChangeViewport: (viewport: ViewState) => void
    onClickMap: (coord: [number, number]) => void
    onClickFeature: (featureId: string) => void
}

export const MapGL: React.FC<IMapGLProps> = props => {
    const onClick = React.useCallback(event => {
        props.onClickMap(event.lngLat)
    }, [])

    const onFeatureClick = React.useCallback((id) => {
        props.onClickFeature(id)
    }, [props.onClickFeature])

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
            onClick={onClick}
            // onMouseMove={props.onMouseMove}
            attributionControl={false}
        >
            <style global jsx>{`
                .mapboxgl-popup-close-button {
                    display: none;
                }

                .mapboxgl-popup {
                    min-width: 300px;
                    max-width: 400px;

                    border: 1px solid black;
                }

                .mapboxgl-popup-content {
                    border-radius: 0;
                    padding: 0;
                }

                /* Marker tweaks */
                .mapboxgl-popup-tip {
                    display: none;
                }

                @media only screen and (max-width: 480px) {
                    .mapboxgl-popup-content {
                        //max-width: 250px;
                    }
                    .mapboxgl-popup-content div {
                        padding: 0em;
                    }
                    .mapboxgl-popup-content p {
                        margin: 0.5em 0.5em;
                    }
                }

                @media (max-width: 31.25em) {
                    .mapboxgl-popup {
                        //display: none;
                    }
                }
            `}</style>

            {props.features.map((f, i) => (
                <Marker
                    key={i}
                    longitude={f.geometry.coordinates[0]}
                    latitude={f.geometry.coordinates[1]}
                >
                    <SvgCircles
                        size={32}
                        value={f.id ? `${f.id}` : undefined}
                        onClick={onFeatureClick}
                    >
                        {[
                            {
                                size: 32,
                                color: f.properties.color1,
                            },
                            {
                                size: 16,
                                color: f.properties.color2,
                            },
                        ]}
                    </SvgCircles>
                </Marker>
            ))}

            {props.children}
        </ReactMapGL>
    )
}
