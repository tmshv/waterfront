import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Image = (props) => (
    <div>
        <style jsx>{`
            div {
                width: 100%;
            }
            
            img {
                width: 100%;
            }
        `}</style>

        <img
            src={props.src}
            alt={props.alt}
        />
    </div>
)

const Article = (props) => {
    return (
        <article>
            <style jsx>{`
                div {
                    width: 70%;
                    margin: 0 auto;
                }

                @media screen and (max-width: 31.25em) {
                    div {
                        width: 100%;
                    }
                }
            `}</style>

            <Image
                src={props.article.previewImage}
                alt={props.article.name}
            />

            <div
                dangerouslySetInnerHTML={{ __html: props.article.body }}
            />
        </article>
    )
}

Article.propTypes = {
    article: PropTypes.object,
    // article: PropTypes.shape({
    //     i
    // })
}

export default Article