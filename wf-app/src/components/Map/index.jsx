import React from 'react'

import {initMap} from './lib'

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.mapRef = React.createRef()        
    }

    componentDidMount() {
        initMap(this.mapRef.current)
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
