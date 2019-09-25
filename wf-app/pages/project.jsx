import React from 'react'
import { getFeature } from '../src/api'
import Article from '../src/components/Article'
import { toArticle } from '../src/app/factory';
import { DefaultLayout } from '../src/components/DefaultLayout'
import Menu from '../src/components/Menu'
import Footer from '../src/components/Footer'

const Project = (props) => (
    <DefaultLayout
        headerOverlay={true}
        header={(
            <Menu />
        )}
        main={(
            <Article
                article={props.article}
            />
        )}
        footer={(
            <Footer />
        )}
    />
)

Project.getInitialProps = async ({ query }) => {
    const slug = query.slug
    const data = await getFeature(slug)
    const feature = data.features[0]

    return {
        article: toArticle(feature)
    }
}

export default Project