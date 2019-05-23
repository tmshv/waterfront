import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Image = (props) => (
    <div>
        <style jsx>{`
            div {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                //max-height: 100vh;

                overflow: none;
            }
            
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        `}</style>

        <img
            src={props.src}
            alt={props.alt}
        />
    </div>
)

const ArticleHead = (props) => {
    return (
        <section>
            <style jsx>{`
                section {
                    position: relative;
                    width: 100%;
                    height: calc(100vh - 60px);
                }

                h1 {
                    position: absolute;
                    width: 70%;
                    bottom: 100px;
                    left: 0;
                    right: 0;
                    color: white;
                    font-size: 5em;
                    padding: 0;
                    margin: 0 auto;

                    text-shadow: 2px 2px 0px black;
                }
            `}</style>
            
            {props.children}

            <h1>
                {props.title}
            </h1>
        </section>
    )
}

const Article = (props) => {
    return (
        <article>
            <style jsx>{`
                div {
                    width: 70%;
                    margin: 0 auto;
                    padding-top: 60px;
                }

                @media screen and (max-width: 31.25em) {
                    div {
                        width: 100%;
                    }
                }
            `}</style>

            <ArticleHead
                title={props.article.name}
            >
                <Image
                    src={props.article.previewImage}
                    alt={props.article.name}
                />
            </ArticleHead>

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