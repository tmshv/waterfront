import React from 'react'
import PropTypes from 'prop-types'

const ArticleCard = (props) => {
    return (
        <a
            href={props.article.url}
        >
            <div>
                <style jsx>{`
                div {
                    width: 25%;
                }

                img {
                    width: 100%;
                }
            `}</style>

                <img
                    src={props.article.previewImage}
                />

                <p
                    dangerouslySetInnerHTML={{ __html: props.article.short }}
                />
            </div>
        </a>
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object,
}

export default ArticleCard