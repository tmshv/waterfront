import React from 'react'
import { getFeature } from '../src/api'
import Article from '../src/components/Article'
import { toArticle } from '../src/app/factory';
import DefaultLayout from '../src/components/DefaultLayout';

const year = () => (new Date()).getFullYear()
const Project = (props) => (
    <DefaultLayout
        headerOverlay={true}
        header={(
            <div>waterfront</div>
        )}
        main={(
            <Article
                article={props.article}
            />
        )}
        footer={(
            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        justify-content: space-between;
                        margin: 0 25px;
                    }

                    span {
                        padding: 0 10px;
                    }

                    @media screen and (max-width: 31.25em) {
                        div {
                            margin: 0 10px;
                        }
                    }
                `}</style>

                <section>
                    waterfront.tool
                    <span>/</span>
                    {year()}
                </section>
                <section>
                    contacts
                </section>
            </div>
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