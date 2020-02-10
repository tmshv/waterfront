import { NextPage } from 'next'

import { IEvent } from 'src/types'
import { i18n, withTranslation } from 'src/i18n'
import { CardList } from 'src/components/CardList'
import { Card } from 'src/components/Card'
import { createApiUrl } from 'src/app/lib'
import { getJson } from 'src/lib/fetch'
import { PageLayout } from 'src/components/PageLayout'
import { useMobile } from 'src/hooks/useMobile'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import * as Layout from 'src/components/Layout'

interface IProps {
    events: IEvent[]
}

export const Page: NextPage<IProps> = props => {
    const isMobile = useMobile()
    const columns = isMobile ? 1 : 3
    const head = props.events[0]

    return (
        <Layout.Cards>
            <PageLayout
                wideBody={true}
                head={(
                    <PageHead
                        title={head.name}
                        caption={head.short}
                        image={head.imageId}
                    />
                )}
            >
                <CardList
                    style={{
                        marginTop: 'var(--size-l)',
                        padding: '0 var(--size-l)',
                    }}
                    columns={columns}
                    items={props.events}
                    renderItem={(item, style) => (
                        <Card
                            style={style}
                            key={item.slug}
                            title={item.name}
                            previewImage={item.imageId}
                            tags={[]}
                            href={item.href}
                        >
                            <Short text={item.short} />
                        </Card>
                    )}
                />
            </PageLayout>
        </Layout.Cards>
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
