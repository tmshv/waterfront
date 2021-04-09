import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import { components } from '@/mdx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getPages, getPageBySlug } from '@/api'
import { PageDefinition } from '@/types'
import { PageContext } from '@/context/page'
import { useRouter } from 'next/router'
import { Opengraph } from '@/components/Opengraph'
import { PageLayout } from '@/components/PageLayout'

const BasicProvider = props => (
    <article>
        {props.children}
    </article>
)

type Props = Omit<PageDefinition, 'content'> & {
    source: MdxRemote.Source
}

const Page: NextPage<Props> = props => {
    const router = useRouter()
    const content = hydrate(props.source, {
        components,
        provider: {
            component: BasicProvider,
            props: {}
        }
    })

    return (
        <PageContext.Provider value={props as any}>
            <Opengraph
                url={router.asPath}
            />

            <PageLayout>
                {content}
            </PageLayout>
        </PageContext.Provider>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
    let slug = ''
    if (ctx.params) {
        slug = (ctx.params!.page! as string[]).join('/')
    }
    slug = '/' + slug

    const page = await getPageBySlug(ctx.locale, slug)
    if (!page) {
        return {
            notFound: true,
        }
    }

    const { content, ...def } = page
    const source = await renderToString(content, {
        components,
        provider: {
            component: PageContext.Provider,
            props: {
                value: {
                   ...def,
                }
            }
        }
    })

    return {
        props: {
            ...def,
            source,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async ctx => {
    const pages = await getPages()

    return {
        paths: pages
            .map(({ slug, locale }) => {
                const page = slug.split('/').slice(1)

                return {
                    params: { page },
                    locale,
                }
            }),
        fallback: false,
    }
}

export default Page
