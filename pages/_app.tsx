import { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika'
import Head from 'next/head'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'src/style.css'
import 'src/article.css'

import { MdxRoot } from '@/components/MdxRoot'
import { Opengraph } from '@/components/Opengraph'
import { PageLayout } from '@/components/PageLayout'
import { PageConfig } from '@/components/PageConfig'
import { LangContext } from '@/context/lang'

import ru from '@/ru.json'
import en from '@/en.json'

export default function MyApp({ Component, pageProps, router }: AppProps) {
    const metrika = process.env.NEXT_PUBLIC_METRIKA
    const lang = router.asPath.endsWith('/en') ? 'en' : 'ru'
    const dict = { en, ru }[lang]

    return (
        <PageConfig>
            <Head>
                <meta name={'viewport'} content={'initial-scale=1,maximum-scale=1,user-scalable=no'} />
                <meta name="yandex-verification" content="6db21bf07b5a1c67" />

            </Head>

            <Opengraph
                url={router.asPath}
            />


            {!metrika ? null : (
                <YMInitializer accounts={[Number(metrika)]} />
            )}

            <LangContext.Provider value={{
                lang,
                dict,
            }}>
                <PageLayout>
                    <MdxRoot>
                        {/* <article> */}
                        <Component {...pageProps} />
                        {/* </article> */}
                    </MdxRoot>
                </PageLayout>
            </LangContext.Provider>
        </PageConfig>
    )
}
