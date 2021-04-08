import { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika'
import Head from 'next/head'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'src/style.css'
import 'src/article.css'

import { PageLayout } from '@/components/PageLayout'
import { LangContext } from '@/context/lang'

import ru from '@/ru.json'
import en from '@/en.json'

export default function MyApp({ Component, pageProps, router }: AppProps) {
    const metrika = process.env.NEXT_PUBLIC_METRIKA
    const lang = router.locale ?? 'ru'
    const dict = { en, ru }[lang]!

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
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </LangContext.Provider>
        </>
    )
}
