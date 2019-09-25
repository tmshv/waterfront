import React from 'react'
import App, { Container } from 'next/app'
import { init } from '../src/app/init'
// import { DefaultLayout } from '../src/components/DefaultLayout'
// import { Article } from '../src/components/Article'

function getLang() {
    if (global['window'] && global['window'].localStorage) {
        const value = localStorage.getItem('lang')
        if (value) {
            return value
        }
    }

    return 'en'
}

export default class MyApp extends App {
    constructor(props) {
        super(props)

        const defaultLang = getLang()
        init({
            defaultLang,
            translation: {
                en: {
                    translation: {
                        'hello': 'hello',
                        'About': 'About',
                        'Projects': 'Projects',
                        'Events': 'Events',
                    },
                },
                ru: {
                    translation: {
                        'hello': 'Privet',
                        'About': 'O',
                        'Projects': 'Projecti',
                        'Events': 'Sobitia',
                    },
                },
            }
        })
    }

    render() {
        const { Component, pageProps } = this.props
        // constructor(props) {
        //     super(props)


        // }

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}