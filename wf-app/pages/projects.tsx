import * as React from 'react'

import { NextPage } from 'next'

import { getFeatures } from '../src/app/api'
import { toArticle } from '../src/app/factory'
import { ArticleCardList } from '../src/components/ArticleCardList'
import { Menu } from '../src/components/Menu'
import Footer from '../src/components/Footer'
import { DefaultLayout } from '../src/components/DefaultLayout'
import { AppPointFeature } from '../src/app/types'
import { i18n } from '../src/i18n'

interface IProps {
    features: AppPointFeature[]
}

export const Page: NextPage<IProps> = props => {
    const articleCards = props.features.map(toArticle)

    return (
        <DefaultLayout
            header={(
                <Menu />
            )}
            main={(
                <div>
                    <style jsx>{`
                        div {
                            padding: 0 10px;
                        }
                    `}</style>

                    <ArticleCardList
                        highlightFirst={true}
                        items={articleCards}
                        columns={3}
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