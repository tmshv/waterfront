import React from 'react'

import {initMap} from './lib'

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.mapRef = React.createRef()        
    }

    async componentDidMount() {
        const map = await initMap(this.mapRef.current)

        map.on('click', event => {
            console.log('map click', event.lngLat)
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
