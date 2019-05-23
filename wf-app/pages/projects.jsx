import React, { useReducer } from 'react'
import { getFeatures } from '../src/api'
import { toArticle } from '../src/app/factory'
import ArticleCardList from '../src/components/ArticleCardList'
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
                <style jsx>{`
                    div {
                        padding: 0 10px;
                    }
                `}</style>
                
                <ArticleCardList
                    items={props.articleCards}
                />
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