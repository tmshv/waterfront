import * as React from 'react'

import { NextPage } from 'next'

import { getFeature } from '../src/app/api'
import { Article } from '../src/components/Article'
import { featureToArticle } from '../src/app/factory';
import { i18n, withTranslation } from '../src/i18n'
import { IArticle } from '../src/app/types'
import { useLayout } from '../src/hooks/useLayout';
import { PageLayout } from '../src/components/PageLayout';

interface IProps {
    article: IArticle
}

const Page: NextPage<IProps> = props => {
    return (
        <PageLayout
            head={{
                title: props.article.name,
                caption: props.article.short,
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

    const slug = Array.isArray(query.slug)
        ? query.slug[0]
        : query.slug
    const feature = await getFeature(lang!, slug)

    return {
        article: featureToArticle(feature)
    }
}

export default withTranslation('common')(Page as any)
