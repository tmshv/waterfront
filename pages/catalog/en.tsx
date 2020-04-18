import { GetStaticProps } from 'next'
import Page, { CatalogProps } from './'
import { getCatalogCards } from 'src/app/catalog'

export const getStaticProps: GetStaticProps<CatalogProps> = async ({ params }) => {
    const pages = await getCatalogCards('en')

    return {
        props: {
            pages,
        },
    }
}

export default Page
