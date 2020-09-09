import { NextPage, GetStaticProps } from 'next'
import { useTranslation } from '@/hooks/useTranslation'
import { useColumns } from '@/hooks/useColumns'
import { CardsPage } from '@/components/CardsPage'
import { getProjectCards } from '@/app/catalog'
import { PageDescription } from '@/types'

export interface IProps {
    pages: PageDescription[]
}

export const Page: NextPage<IProps> = props => {
    const { t } = useTranslation()
    const columns = useColumns()

    return (
        <CardsPage
            title={t('Projects')}
            excerpt={t('Projects')}
            cover={'/assets/wf_about_head.jpg'}
            items={props.pages.map(x => ({
                title: x.title!,
                cover: x.cover,
                excerpt: x.excerpt,
                slug: x.slug,
                tags: x.tags,
            }))}
        />
    )
}

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
    const pages = await getProjectCards('ru')

    return {
        props: {
            pages,
        },
    }
}

export default Page
