import React from 'react'
import App, { Container } from 'next/app'
import { appWithTranslation } from '../src/i18n'

import 'mapbox-gl/dist/mapbox-gl.css'

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <style global jsx>{`
                    :root {
                        --body-background-color: white;
                        --footer-background-color: rgb(0, 83, 108);
                        --background-color: rgb(255, 255, 255);
                    }

                    body {
                        font-family: Arial;
                        background-color: var(--body-background-color);

                        height: 100vh;
                        padding: 0;
                        margin: 0;
                    }

                    #__next {
                        height: 100%;
                    }
                `}</style>
                
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default appWithTranslation(MyApp)
