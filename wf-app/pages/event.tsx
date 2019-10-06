import * as React from 'react'

import { NextPage } from 'next'

import { Article } from '../src/components/Article'
import { eventToArticle } from '../src/app/factory'
import { DefaultLayout } from '../src/components/DefaultLayout'
import { Menu } from '../src/components/Menu'
import Footer from '../src/components/Footer'
import { i18n, withTranslation } from '../src/i18n'
import { IArticle } from '../src/app/types'
import { getJson, q } from '../src/lib/fetch'
import { createApiUrl } from '../src/app/lib'
import { IEvent } from '../src/types'

interface IProps {
    article: IArticle
}

const Page: NextPage<IProps> = props => (
    <DefaultLayout
        header={(
            <Menu />
        )}
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

Page.getInitialProps = async ({ req, query }) => {
    let lang: string | null = null
    if (req) {
        lang = (req as any).i18n.language
    } else {
        lang = i18n.language
    }

    const slug = q(query.slug)
    const event = await getJson<IEvent>(
        createApiUrl(req, `/api/events/${slug}`),
        {
            lang,
        }
    )
    const article = eventToArticle(event)

    return {
        article,
        namespacesRequired: ['common'],
    }
}

export default withTranslation('common')(Page as any)
