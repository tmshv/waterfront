import { GetStaticProps, NextPage } from 'next'
import { CardList } from '@/components/CardList'
import { Card } from '@/components/Card'
import { PageLayout } from '@/components/PageLayout'
import { Short } from '@/components/Short'
import { PageHead } from '@/components/PageHead'
import * as Layout from '@/components/Layout'
import { useColumns } from '@/hooks/useColumns'
import { getPagesByTag } from '@/api'
import { useTranslation } from '@/hooks/useTranslation'
import { formatDate } from '@/app/lib'

function getCardTags(item: PageCardData): string[] {
    const date = new Date(item.date)
    if (!date) {
        return []
    }
    const f = formatDate(date)

    return [f]
}

type PageCardData = {
    tags: string[],
    title: string,
    cover: string,
    excerpt: string,
    slug: string,
    date: string,
}

interface IProps {
    pages: PageCardData[]
}

export const Page: NextPage<IProps> = props => {
    const { t } = useTranslation()
    const columns = useColumns()

    return (
        <Layout.Cards>
            <PageLayout
                wideBody={true}
                head={(
                    <PageHead
                        title={t('Events')}
                        caption={t('events_excerpt')}
                        image={'/assets/wf_about_head.jpg'}
                    />
                )}
            >
                <CardList
                    style={{
                        marginTop: 'var(--size-l)',
                        padding: '0 var(--size-l)',
                    }}
                    columns={columns}
                    items={props.pages}
                    renderItem={(item, style) => (
                        <Card
                            style={style}
                            key={item.slug}
                            title={item.title}
                            previewImage={item.cover}
                            tags={getCardTags(item)}
                            href={item.slug}
                        >
                            <Short text={item.excerpt} />
                        </Card>
                    )}
                />
            </PageLayout>
        </Layout.Cards>
    )
}

export const getStaticProps: GetStaticProps<IProps> = async ctx => {
    const pages = await getPagesByTag(ctx.locale, ['event'], {
        omitContent: true,
        sort: (a, b) => {
            if (a.date && b.date) {
                const ad = new Date(a.date)
                const bd = new Date(b.date)

                return bd.getTime() - ad.getTime()
            }

            return 1
        },
    })

    return {
        props: {
            pages: pages as any
        },
    }
}

export default Page
