import React from 'react'
import PropTypes from 'prop-types'
import { head, tail } from 'lodash'
import Link from 'next/link'
import ArticleCard from '../ArticleCard'
import Article from '../Article'

const HeadArticle = (props) => (
    <Link
        href={props.item.url}
    >
        <a>
            <Article
                article={props.item}
                showContent={false}
                showCaption={true}
            />
        </a>
    </Link>
)


const ArticleCardList = (props) => {
    return (
        <div>
            <section
                style={{
                    width: '100%',
                    marginBottom: 1,
                }}
            >
                <HeadArticle
                    item={head(props.items)}
                />
            </section>

            <div>
                <style jsx>{`
                    div {
                        display: flex;
                        flex-wrap: wrap;
                    }
                `}</style>

                {tail(props.items).map(x => (
                    <ArticleCard
                        key={x.slug}
                        article={x}
                        style={{
                            paddingRight: 1,
                            paddingBottom: 1,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

ArticleCardList.propTypes = {
    items: PropTypes.array,
}

export default ArticleCardList