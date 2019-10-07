import * as React from 'react'

import { NextPage } from 'next'

import { getFeatures } from '../src/app/api'
import { featureToArticle } from '../src/app/factory'
import { CardList } from '../src/components/CardList'
import { Menu } from '../src/components/Menu'
import Footer from '../src/components/Footer'
import { DefaultLayout } from '../src/components/DefaultLayout'
import { AppPointFeature } from '../src/app/types'
import { i18n } from '../src/i18n'
import { ArticleCard } from '../src/components/ArticleCard'
import { HeadArticleCard } from '../src/components/ArticleCard/HeadArticleCard'
import { Header } from '../src/components/Header'
import { useLayout } from '../src/hooks/useLayout'

interface IProps {
    features: AppPointFeature[]
}

export const Page: NextPage<IProps> = props => {
    const articleCards = props.features.map(featureToArticle)
    const layout = useLayout()

    return (
        <DefaultLayout
            navigation={(
                <Header
                    layout={layout}
                >
                    <Menu
                        layout={layout}
                    />
                </Header>
            )}
            head={(<></>)}
            main={(
                <div>
                    <style jsx>{`
                        div {
                            padding: 0 10px;
                        }
                    `}</style>

                    <CardList
                        columns={3}
                        items={articleCards}
                        highlightFirst={true}
                        renderFirstItem={article => (
                            <HeadArticleCard
                                item={article}
                            />
                        )}
                        renderItem={article => (
                            <ArticleCard
                                key={article.slug}
                                article={article}
                                style={{
                                    marginBottom: '2em',
                                }}
                            />
                        )}
                    />
                </div>
            )}
            footer={(
                <Footer />
            )}
        />
    )
}

Page.getInitialProps = async ({ req }) => {
    let lang: string | null = null
    if (req) {
        lang = (req as any).i18n.language
    } else {
        lang = i18n.language
    }

    const city = 'saint_petersburg'
    const data = await getFeatures(lang!, city, true)

    return {
        features: data,
    }
}

export default Page