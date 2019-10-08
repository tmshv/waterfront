import * as React from 'react'

import { NextPage } from 'next'

import { Article } from '../src/components/Article'
import { eventToArticle } from '../src/app/factory'
import { i18n, withTranslation } from '../src/i18n'
import { IArticle } from '../src/app/types'
import { getJson, q } from '../src/lib/fetch'
import { createApiUrl } from '../src/app/lib'
import { IEvent } from '../src/types'
import { PageLayout } from '../src/components/PageLayout'

interface IProps {
    article: IArticle
}

const Page: NextPage<IProps> = props => {
    return (
        <PageLayout
            head={{
                title: props.article.name,
                image: props.article.previewImage,
            }}
        >
            <Article
                article={props.article}
            />
        </PageLayout>
    )
}

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
