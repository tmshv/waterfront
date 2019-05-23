import React, { useReducer } from 'react'
import { getFeatures } from '../src/api'
import { toArticle } from '../src/app/factory'
import ArticleCard from '../src/components/ArticleCard'

const Projects = (props) => {
    return (
        <div>
            {props.articleCards.map(x => (
                <ArticleCard
                    key={x.slug}
                    article={x}
                />
            ))}
        </div>
    )
}

Projects.getInitialProps = async ({ query }) => {
    // const city = query.city || 'saint_peterburg'
    const city = 'saint_petersburg'
    const data = await getFeatures(city, true)

    return {
        articleCards: data.features.map(toArticle),
    }
}

export default Projects