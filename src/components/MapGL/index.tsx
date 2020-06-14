import { useCallback } from 'react'
import ReactMapGL, { ViewState } from 'react-map-gl'

export type OnChangeViewport = (viewport: ViewState) => void
export interface IMapGLProps {
    mapStyle: string | object
    viewport: ViewState
    onChangeViewport: OnChangeViewport
    onClickMap: (coord: [number, number]) => void
}

export const MapGL: React.FC<IMapGLProps> = props => {
    const onClick = useCallback(event => {
        props.onClickMap(event.lngLat)
    }, [])

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

            {props.children}
        </ReactMapGL>
    )
}
