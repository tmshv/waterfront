import Page from '.'
import { GetStaticProps } from 'next'
import { getFeatures } from '@/api'
import { FeatureCollection } from 'geojson'
export default Page

type Props = {
    data: {
        [name: string]: FeatureCollection
    }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const spb = await getFeatures('en', 'saint_petersburg')
    const oslo = await getFeatures('en', 'oslo')
    const stockholm = await getFeatures('en', 'stockholm')

    return {
        props: {
            data: {
                saint_petersburg: spb!,
                oslo: oslo!,
                stockholm: stockholm!,
            }
        }
    }
}
