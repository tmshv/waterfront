import React from 'react'
import App, { Container } from 'next/app'
import { appWithTranslation } from '../src/i18n'

import 'mapbox-gl/dist/mapbox-gl.css'
import '../src/style.css'

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default appWithTranslation(MyApp)
