import * as React from 'react'

import { NextPage } from 'next'

import { IEvent } from '../src/types'
import { i18n, withTranslation } from '../src/i18n'
import { CardList } from '../src/components/CardList'
import { Card } from '../src/components/Card'
import { createApiUrl } from '../src/app/lib'
import { getJson } from '../src/lib/fetch'
import { PageLayout } from '../src/components/PageLayout'
import { useMobile } from '../src/hooks/useMobile'
import { HeadArticleCard } from 'src/components/ArticleCard/HeadArticleCard'
import { eventToArticle } from 'src/app/factory'
import { PageHead } from 'src/components/PageHead'

interface IProps {
    events: IEvent[]
}

export const Page: NextPage<IProps> = props => {
    const isMobile = useMobile()
    const columns = isMobile ? 1 : 3

    return (
        <PageLayout
            wideBody={true}
        >
            <CardList
                style={{
                    padding: '0 8px',
                }}
                columns={columns}
                items={props.events}
                // highlightFirst={false}
                highlightFirst={true}
                renderFirstItem={item => (
                    <PageHead
                        title={item.name}
                        // caption={props.head.caption}
                        image={item.imageId}
                    />
                )}
                renderItem={item => (
                    <Card
                        key={item.slug}
                        title={item.name}
                        body={''}
                        previewImage={item.imageId}
                        tags={[]}
                        href={item.href}
                    />
                )}
            />
        </PageLayout>
    )
}

Page.getInitialProps = async ({ req }) => {
    let lang: string | null = null
    if (req) {
        lang = (req as any).i18n.language
    } else {
        lang = i18n.language
    }

    const events = await getJson<IEvent[]>(
        createApiUrl(req, `/api/events`),
        {
            lang,
        }
    )

    return {
        events,
        namespacesRequired: ['common'],
    }
}

export default withTranslation('common')(Page as any)
