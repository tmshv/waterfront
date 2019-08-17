import React, { useReducer } from 'react'
import { getFeatures } from '../src/api'
import { toArticle } from '../src/app/factory'
import { ArticleCardList } from '../src/components/ArticleCardList'
import Menu from '../src/components/Menu'
import Footer from '../src/components/Footer'
import DefaultLayout from '../src/components/DefaultLayout'

const Projects = (props) => {
    const articleCards = props.data.features.map(toArticle)

    return (
        <DefaultLayout
            // headerOverlay={true}
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
                        highlightFirst={true}
                        items={articleCards}
                        columns={3}
                    />
                </div>
            )}
            footer={(
                <Footer />
            )}
        />
    )
}

Projects.getInitialProps = async ({ query }) => {
    // const city = query.city || 'saint_peterburg'
    const city = 'saint_petersburg'
    const data = await getFeatures(city, true)

    return {
        data,
    }
}

export default Projects