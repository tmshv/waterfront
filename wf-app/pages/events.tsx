import { NextPage } from 'next'

import { IEvent } from 'src/types'
import { withTranslation } from 'src/i18n'
import { CardList } from 'src/components/CardList'
import { Card } from 'src/components/Card'
import { createApiUrl } from 'src/app/lib'
import { getJson } from 'src/lib/fetch'
import { PageLayout } from 'src/components/PageLayout'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import * as Layout from 'src/components/Layout'
import { useColumns } from 'src/hooks/useColumns'
import { getLang } from 'src/server/lib'

interface IProps {
    events: IEvent[]
}

export const Page: NextPage<IProps> = props => {
    const columns = useColumns()
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

Page.getInitialProps = async ctx => {
    const lang = getLang(ctx)
    const events = await getJson<IEvent[]>(
        createApiUrl(ctx.req, `/api/events`),
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
