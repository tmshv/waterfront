import { GetStaticProps } from 'next'
import { Page, IProps } from './'
import { getProjectCards } from 'src/app/catalog'

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
    const pages = await getProjectCards('en')

    return {
        props: {
            pages,
        },
    }
}

export default Page
