import { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika'
import Head from 'next/head'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'src/style.css'
import 'src/article.css'

import { useContext } from 'react'
import { MdxRoot } from '@/components/MdxRoot'
import { PageContext } from '@/context/page'
import { PageLayout } from '@/components/PageLayout'
import { PageConfig } from '@/components/PageConfig'
import { LangContext } from '@/context/lang'

import ru from '@/ru.json'
import en from '@/en.json'

type OpengraphProps = {
    url: string
}

const Opengraph: React.SFC<OpengraphProps> = props => {
    const config = useContext(PageContext)
    if (!config.title) {
        return null
    }

    const url = `https://waterfront.tools${props.url}`
    const image = `https://waterfront.tools${config.cover}`

    return (
        <Head>
            {/* Search Engine */}
            <meta name="description" content={config.excerpt} />
            <meta name="image" content={image} />

            {/* Schema.org for Google */}
            <meta itemProp="name" content={config.title} />
            <meta itemProp="description" content={config.excerpt} />
            <meta itemProp="image" content={image} />

            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta property="og:title" content={config.title} />
            <meta property="og:description" content={config.excerpt} />
            <meta property="og:image" content={image} />
            {/* <meta property="og:image:width" content={config.imageWidth.toString()} /> */}
            {/* <meta property="og:image:height" content={config.imageHeight.toString()} /> */}
            <meta property="og:url" content={url} />
            {/* <meta property="og:site_name" content={config.siteName} /> */}
            {/* <meta property="og:locale" content={config.locale} /> */}
            {/* <meta property="og:type" content={config.type} /> */}
        </Head>
    )
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
    const metrika = process.env.NEXT_PUBLIC_METRIKA
    const lang = router.asPath.endsWith('/en') ? 'en' : 'ru'
    const dict = { en, ru }[lang]

    return (
        <>
            <Head>
                <meta name={'viewport'} content={'initial-scale=1,maximum-scale=1,user-scalable=no'} />
                <meta name="yandex-verification" content="6db21bf07b5a1c67" />
            </Head>

            {!metrika ? null : (
                <YMInitializer accounts={[Number(metrika)]} />
            )}

            <LangContext.Provider value={{
                lang,
                dict,
            }}>
                <PageConfig>
                    <Opengraph
                        url={router.asPath}
                    />
                    <PageLayout>
                        <MdxRoot>
                            {/* <article> */}
                            <Component {...pageProps} />
                            {/* </article> */}
                        </MdxRoot>
                    </PageLayout>
                </PageConfig>
            </LangContext.Provider>
        </>
    )
}
