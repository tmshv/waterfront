import App from 'next/app'
import { Head } from 'next/document'
import { appWithTranslation } from 'src/i18n'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'src/style.css'

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        return (
            <Component {...pageProps}>
                <Head>
                    <meta name={'viewport'} content={'initial-scale=1,maximum-scale=1,user-scalable=no'} />
                </Head>
            </Component>
        )
    }
}

export default appWithTranslation(MyApp)
