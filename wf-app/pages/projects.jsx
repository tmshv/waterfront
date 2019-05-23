import React, { useReducer } from 'react'
import { getFeatures } from '../src/api'
import { toArticle } from '../src/app/factory'
import ArticleCard from '../src/components/ArticleCard'
import Menu from '../src/components/Menu'
import Footer from '../src/components/Footer'
import DefaultLayout from '../src/components/DefaultLayout'

const Projects = (props) => (
    <DefaultLayout
        headerOverlay={true}
        header={(
            <Menu />
        )}
        main={(
            <div>
                {props.articleCards.map(x => (
                    <ArticleCard
                        key={x.slug}
                        article={x}
                    />
                ))}
            </div>
        )}
        footer={(
            <Footer />
        )}
    />
)

Projects.getInitialProps = async ({ query }) => {
    // const city = query.city || 'saint_peterburg'
    const city = 'saint_petersburg'
    const data = await getFeatures(city, true)

    return {
        articleCards: data.features.map(toArticle),
    }
}

export default Projects