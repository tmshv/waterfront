import * as React from 'react'

import { NextPage } from 'next'

import { Menu } from '../src/components/Menu'
import Footer from '../src/components/Footer'
import { DefaultLayout } from '../src/components/DefaultLayout'
import { IEvent } from '../src/types'
import { i18n, withTranslation } from '../src/i18n'
import { CardList } from '../src/components/CardList'
import { Card } from '../src/components/Card'
import { createApiUrl } from '../src/app/lib'
import { getJson } from '../src/lib/fetch'
import { useLayout } from '../src/hooks/useLayout'
import { Header } from '../src/components/Header'

interface IProps {
    events: IEvent[]
}

export const Page: NextPage<IProps> = props => {
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
            main={(
                <div>
                    <style jsx>{`
                        div {
                            padding: 0 10px;
                        }
                    `}</style>

                    <CardList
                        columns={3}
                        items={props.events}
                        highlightFirst={false}
                        renderItem={item => (
                            <Card
                                title={item.name}
                                // body={item.content}
                                body={''}
                                previewImage={item.imageId}
                                tags={[]}
                                href={item.href}
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
