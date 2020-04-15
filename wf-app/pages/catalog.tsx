import { NextPage } from 'next'
import { getFeatures } from 'src/app/api'
import { featureToArticle } from 'src/app/factory'
import { CardList } from 'src/components/CardList'
import { AppPointFeature } from 'src/app/types'
import { PageLayout } from 'src/components/PageLayout'
import { useColumns } from 'src/hooks/useColumns'
import * as Layout from 'src/components/Layout'
import { Card } from 'src/components/Card'
import { Short } from 'src/components/Short'
import { PageHead } from 'src/components/PageHead'
import { withTranslation, useTranslation } from 'src/i18n'
import { getLang } from 'src/server/lib'
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
    //     <div>
    //         <pre>
    //             {JSON.stringify(props, null, 4)}
    //         </pre>
    //     </div>
    // )

    const { t } = useTranslation()
    // const items = props.features.map(featureToArticle)
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
                    renderItem={(article, style) => {
                        // const year = article.date?.getFullYear()
                        const year = null
                        const tags = year ? [`${year}`] : []

                        return (
                            <Card
                                style={style}
                                key={article.slug}
                                // title={article.name}
                                title={article.title}
                                tags={tags}
                                previewImage={article.cover}
                                href={article.slug}
                            >
                                <Short
                                    text={article.excerpt}
                                />
                            </Card>
                        )
                    }}
                />
            </PageLayout>
        </Layout.Cards>
    )
}

// Page.getInitialProps = async ctx => {
//     const lang = getLang(ctx)

//     // const city = 'saint_petersburg'
//     const city = 'all'
//     const data = await getFeatures(lang, city, true)

//     return {
//         features: data,
//     }
// }

export async function getStaticProps({ params }) {
    // const slug = params.page
    // const post = getPostBySlug(slug, [
    //     'title',
    //     'date',
    //     'slug',
    //     'author',
    //     'content',
    //     'ogImage',
    //     'coverImage',
    // ])
    // const content = await markdownToHtml(post.content || '')

    const pages = await getPagesByTag('feature', {
        omitContent: true
    })

    return {
        props: {
            pages,
            // post: {
            //     // ...post,
            //     content,
            // },
        },
    }
}

// export async function getStaticPaths() {
//     // const paths = await getAllSlugs()
//     const pages = await getPagesByTag('feature')
//     const paths = pages.map(x => x.slug)

//     return {
//         paths,
//         // paths: urls.map(page => ({
//         //     params: {
//         //         page,
//         //     },
//         // })),
//         fallback: false,
//     }
// }

// export default withTranslation('common')(Page as any)
export default Page
