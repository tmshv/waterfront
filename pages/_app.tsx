import { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'src/style.css'
import 'src/article.css'

import { useContext, useEffect } from 'react'
import { PageSignalContext, PageContext } from '@/context/page'
import { PageLayout } from '@/components/PageLayout'
import { PageConfig } from '@/components/PageConfig'
import { PageHead } from '@/components/PageHead'
import { Person } from '@/components/Person'
import { WideBlock } from '@/components/WideBlock'
import { Video } from '@/components/Video'
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
    Video,
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
                <Opengraph
                    url={router.asPath}
                />
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
    const metrika = process.env.METRIKA

    return (
        <>
            <Head>
                <meta name={'viewport'} content={'initial-scale=1,maximum-scale=1,user-scalable=no'} />
                <meta name="yandex-verification" content="6db21bf07b5a1c67" />
            </Head>

            {!metrika ? null : (
                <YMInitializer accounts={[Number(metrika)]} />
            )}

            {content}
        </>
    )
}
