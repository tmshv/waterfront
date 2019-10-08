import * as React from 'react'

import { NextPage } from 'next'

import { getFeature } from '../src/app/api'
import { Article } from '../src/components/Article'
import { featureToArticle } from '../src/app/factory';
import { DefaultLayout } from '../src/components/DefaultLayout'
import { Menu } from '../src/components/Menu'
import Footer from '../src/components/Footer'
import { i18n, withTranslation } from '../src/i18n'
import { IArticle } from '../src/app/types'
import { Header } from '../src/components/Header';
import { useLayout } from '../src/hooks/useLayout';

interface IProps {
    article: IArticle
}

const Page: NextPage<IProps> = props => {
    const layout = useLayout()

    return (
        <DefaultLayout
            navigation={(
                <Header
                    layout={layout}
                >
                    {/* <Menu
                        layout={layout}
                    /> */}
                </Header>
            )}
            head={(<></>)}
            main={(
                <Article
                    article={props.article}
                />
            )}
            footer={(
                <Footer />
            )}
        />
    )
}

Page.getInitialProps = async ({ req, query }) => {
    let lang: string | null = null
    if (req) {
        lang = (req as any).i18n.language
    } else {
        lang = i18n.language
    }

    const slug = Array.isArray(query.slug)
        ? query.slug[0]
        : query.slug
    const feature = await getFeature(lang!, slug)

    return {
        article: featureToArticle(feature)
    }
}

export default withTranslation('common')(Page as any)
