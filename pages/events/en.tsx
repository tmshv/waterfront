import Page from './'
import { getPagesByTag } from 'src/api'

export async function getStaticProps({ params }) {
    const pages = await getPagesByTag('en', ['event'], {
        omitContent: true,
        sort: (a, b) => {
            if (a.date && b.date) {
                const ad = new Date(a.date)
                const bd = new Date(b.date)

                return bd.getTime() - ad.getTime()
            }

            return 1
        },
    })

    return {
        props: {
            pages,
        },
    }
}

export default Page
