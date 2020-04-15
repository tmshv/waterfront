import { NextPage } from 'next'

import { IEvent } from 'src/types'
import { CardList } from 'src/components/CardList'
import { Card } from 'src/components/Card'
import { PageLayout } from 'src/components/PageLayout'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import * as Layout from 'src/components/Layout'
import { useColumns } from 'src/hooks/useColumns'
import { getPagesByTag } from 'src/api'

type PageCardData = {
    tags: string[],
    title: string,
    cover: string,
    excerpt: string,
    slug: string,
}

interface IProps {
    pages: PageCardData[]
}

export const Page: NextPage<IProps> = props => {
    // return (
    //     <div>{JSON.stringify(props, null, 4)}</div>
    // )
    const columns = useColumns()
    const head = props.pages[0]

    return (
        <Layout.Cards>
            <PageLayout
                wideBody={true}
                head={(
                    <PageHead
                        title={head.title}
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
                    items={props.pages}
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

export async function getStaticProps({ params }) {
    const pages = await getPagesByTag('event', {
        omitContent: true
    })

    return {
        props: {
            pages,
        },
    }
}

export default Page
