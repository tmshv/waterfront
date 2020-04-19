import { NextPage, GetStaticProps } from 'next'
import { CardList } from 'src/components/CardList'
import { PageLayout } from 'src/components/PageLayout'
import { useColumns } from 'src/hooks/useColumns'
import * as Layout from 'src/components/Layout'
import { Card } from 'src/components/Card'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import { withTranslation, useTranslation } from 'src/i18n'
import { PageDescription } from 'src/types'
import { getCatalogCards } from 'src/app/catalog'

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
                        caption={head.excerpt}
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

export const getStaticProps: GetStaticProps<CatalogProps> = async ({ params }) => {
    const pages = await getCatalogCards('ru')

    return {
        props: {
            pages,
        },
    }
}

// export default withTranslation('common')(Page as any)
export default Page
