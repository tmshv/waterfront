import React from 'react'

import { initMap, updateMap } from './lib'

export default class Map extends React.Component {
    constructor(props) {
        super(props)

        this.mapRef = React.createRef()
    }

    async componentDidMount() {
        this.map = await initMap(this.mapRef.current, this.props.mapOptions)
        this.map.on('click', event => {
            console.log('map click', event.lngLat)
        })

        this.update()
    }

    componentDidUpdate() {
        this.update()
    }

    update() {
        updateMap(this.map, {
            sources: this.props.sources,
            layers: this.props.layers,
        })
    }

    render() {
        return (
            <div
                className={'map'}
                ref={this.mapRef}
            />
        )
    }
}
