import { NextPage } from 'next'
import { CardList } from 'src/components/CardList'
import { Card } from 'src/components/Card'
import { PageLayout } from 'src/components/PageLayout'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import { useColumns } from 'src/hooks/useColumns'
import * as Layout from 'src/components/Layout'

type PageCardData = {
    tags: string[],
    title: string,
    cover: string,
    excerpt: string,
    slug: string,
}

interface IProps {
    items: PageCardData[]
    title: string
    excerpt: string
    cover: string
}

export const CardsPage: NextPage<IProps> = props => {
    const columns = useColumns()

    return (
        <Layout.Cards>
            <PageLayout
                wideBody={true}
                head={(
                    <PageHead
                        title={props.title}
                        caption={props.excerpt}
                        image={props.cover}
                    />
                )}
            >
                <CardList
                    style={{
                        marginTop: 'var(--size-l)',
                        padding: '0 var(--size-l)',
                    }}
                    columns={columns}
                    items={props.items}
                    renderItem={(item, style) => (
                        <Card
                            style={style}
                            key={item.slug}
                            title={item.title}
                            previewImage={item.cover}
                            tags={[]}
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
