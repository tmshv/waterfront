import { AppProps } from 'next/app'
import Head from 'next/head'
// import { appWithTranslation } from 'src/i18n'
import { MDXProvider } from '@mdx-js/react'
import { PageLayout } from 'src/components/PageLayout'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'src/style.css'
import 'src/article.css'

import { useContext, useEffect } from 'react'
import { PageSignalContext, PageContext } from 'src/context/page'
import { PageConfig } from 'src/components/PageConfig'
import { PageHead } from 'src/components/PageHead'
import { Person } from 'src/components/Person'
import { WideBlock } from 'src/components/WideBlock'
import { LangContext } from 'src/context/lang'
import ru from 'src/ru.json'
import en from 'src/en.json'

const Opengraph: React.SFC = props => {
    const config = useContext(PageContext)
    if (!config.title) {
        return null
    }

    return (
        <Head>
            {/* Search Engine */}
            <meta name="description" content={config.excerpt} />
            <meta name="image" content={config.cover} />

            {/* Schema.org for Google */}
            <meta itemProp="name" content={config.title} />
            <meta itemProp="description" content={config.excerpt} />
            <meta itemProp="image" content={config.cover} />

            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta property="og:title" content={config.title} />
            <meta property="og:description" content={config.excerpt} />
            <meta property="og:image" content={config.cover} />
            {/* <meta property="og:image:width" content={config.imageWidth.toString()} /> */}
            {/* <meta property="og:image:height" content={config.imageHeight.toString()} /> */}
            {/* <meta property="og:url" content={config.url} /> */}
            {/* <meta property="og:site_name" content={config.siteName} /> */}
            {/* <meta property="og:locale" content={config.locale} /> */}
            {/* <meta property="og:type" content={config.type} /> */}

            {/* Twitter */}
            {/* <meta name="twitter:card" content={config.twitterCard} /> */}
            {/* <meta name="twitter:title" content={config.title} /> */}
            {/* <meta name="twitter:description" content={config.excerpt} /> */}
            {/* <meta name="twitter:image:src" content={config.image} /> */}
            {/* <meta name="twitter:domain" content={config.domain} /> */}
            {/* <meta name="twitter:url" content={config.url} /> */}
            {/* <meta name="twitter:site" content={config.twitterSite} /> */}
            {/* <meta name="twitter:creator" content={config.twitterCreator} /> */}
        </Head>
    )
}

// const H1 = props => <h1 style={{ color: 'tomato' }} {...props} />
const H1: React.SFC<{ children: string }> = props => {
    const config = useContext(PageContext)

    return (
        <WideBlock style={{
            marginBottom: 'var(--size-xxl)'
        }}>
            <PageHead
                title={props.children}
                caption={config.excerpt}
                image={config.cover}
            />
        </WideBlock>
    )
}

type PersonData = {
    shape?: string
    name: string
    image: string
    children: React.ReactNode
}

const components = {
    wrapper: props => (
        <article>
            <main {...props} />
        </article>
    ),
    h1: H1,
    Person: (props: PersonData) => (
        <Person
            shape={props.shape ?? 'default'}
            item={{
                name: props.name,
                content: '',
                previewImage: props.image,
                role: 'team',
            }}
            style={{
                marginBottom: 50,
            }}
        >
            {props.children}
        </Person>
    ),
    Demo: props => (
        <h1>This is a component</h1>
    ),
    Meta: props => {
        const signal = useContext(PageSignalContext)

        useEffect(() => {
            signal.trigger(props)
        }, [props])

        return null
    }
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
    const lang = router.asPath.endsWith('/en') ? 'en' : 'ru'
    const dict = { en, ru }[lang]

    const content = (
        <LangContext.Provider value={{
            lang,
            dict,
        }}>
            <PageConfig>
                <Opengraph />
                <PageLayout>
                    <MDXProvider components={components}>
                        {/* <article> */}
                        <Component {...pageProps} />
                        {/* </article> */}
                    </MDXProvider>
                </PageLayout>
            </PageConfig>
        </LangContext.Provider>
    )

    // let content = page
    // const isMdx = Component.hasOwnProperty('isMDXComponent') ? (Component as any).isMDXComponent : false
    // if (isMdx) {
    //     content = (
    //         // head={(
    //         //     <div>head</div>
    //         // )}
    //         >
    //         { page }
    //     )
    // }

    return (
        <>
            <Head>
                <meta name={'viewport'} content={'initial-scale=1,maximum-scale=1,user-scalable=no'} />
                <meta name="yandex-verification" content="6db21bf07b5a1c67" />
            </Head>

            {content}
        </>
    )
}
