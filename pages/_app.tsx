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
