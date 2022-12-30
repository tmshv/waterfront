import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '@/mdx'
import { GetStaticProps, NextPage } from 'next'
import { getPageBySlug } from '@/api'
import { PageDefinition } from '@/types'
import { PageContext } from '@/context/page'
import { useRouter } from 'next/router'
import { Opengraph } from '@/components/Opengraph'
import { PageLayout } from '@/components/PageLayout'
import { ControlsContext } from '@/context/controls'

type Props = Omit<PageDefinition, 'content'> & {
    source: any
}

const Page: NextPage<Props> = ({ source, ...props }) => {
    const router = useRouter()

    return (
        <PageContext.Provider value={props as any}>
            <Opengraph
                url={router.asPath}
            />

            <ControlsContext.Provider value={{ size: 'default', shape: 'default' }}>
                <PageLayout>
                    <article>
                        <MDXRemote {...source} components={components} />
                    </article>
                </PageLayout>
            </ControlsContext.Provider>
        </PageContext.Provider>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
    let slug = '/about'
    const page = await getPageBySlug(ctx.locale, slug)
    if (!page) {
        return {
            notFound: true,
        }
    }

    const { content, ...def } = page
    const source = await serialize(content, {
    })

    return {
        props: {
            ...def,
            source,
        }
    }
}

export default Page
