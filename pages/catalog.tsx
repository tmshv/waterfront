import { NextPage, GetStaticProps } from 'next'
import { CardList } from '@/components/CardList'
import { PageLayout } from '@/components/PageLayout'
import { useColumns } from '@/hooks/useColumns'
import * as Layout from '@/components/Layout'
import { Card } from '@/components/Card'
import { Short } from '@/components/Short'
import { PageHead } from '@/components/PageHead'
import { useTranslation } from '@/hooks/useTranslation'
import { PageDescription } from '@/types'
import { getCatalogCards } from '@/app/catalog'

export type CatalogProps = {
    pages: PageDescription[]
}

export const Page: NextPage<CatalogProps> = props => {
    const { t } = useTranslation()
    const items = props.pages
    const columns = useColumns()
    const head = items[0]

    return (
        <Layout.Cards>
            <PageLayout
                wideBody={true}
                head={(
                    <PageHead
                        title={t('Catalog')}
                        caption={t('catalog_excerpt')}
                        image={head.cover}
                    />
                )}
            >
                <CardList
                    style={{
                        marginTop: 'var(--size-l)',
                        padding: '0 var(--size-l)',
                    }}
                    columns={columns}
                    items={items}
                    renderItem={(item, style) => {
                        const tags: string[] = []
                        if (item.city) {
                            tags.push(item.city)
                        }
                        if (item.year) {
                            tags.push(`${item.year}`)
                        }
                        const title = item.title ?? ''

                        return (
                            <Card
                                style={style}
                                key={item.slug}
                                title={title}
                                tags={tags}
                                previewImage={item.cover}
                                href={item.slug}
                            >
                                <Short
                                    text={item.excerpt}
                                />
                            </Card>
                        )
                    }}
                />
            </PageLayout>
        </Layout.Cards>
    )
}

export const getStaticProps: GetStaticProps<CatalogProps> = async ctx => {
    const pages = await getCatalogCards(ctx.locale)

    return {
        props: {
            pages,
        },
    }
}

export default Page
