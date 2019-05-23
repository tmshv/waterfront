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

                div {
                    position: absolute;
                    width: 70%;
                    bottom: 100px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                }

                h1 {
                    color: white;
                    font-size: 5em;
                    padding: 0 10px;
                    margin: 0;

                    text-shadow: 2px 2px 0px black;
                }

                p {
                    color: white;
                    background-color: rgb(90, 200, 240, 0.95);
                    padding: 10px 15px;
                    width: 50%;
                    min-width: 300px;
                }
            `}</style>

            {props.children}

            <div>
                <h1>
                    {props.title}
                </h1>

                {!props.showCaption || !props.caption ? null : (
                    <p
                        dangerouslySetInnerHTML={{ __html: props.caption }}
                    />
                )}
            </div>
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
                caption={props.article.short}
                showCaption={props.showCaption}
            >
                <Image
                    src={props.article.previewImage}
                    alt={props.article.name}
                />
            </ArticleHead>

            {!props.showContent ? null : (
                <div
                    dangerouslySetInnerHTML={{ __html: props.article.body }}
                />
            )}
        </article>
    )
}

Article.propTypes = {
    article: PropTypes.object,
    showContent: PropTypes.bool,
    showCaption: PropTypes.bool,
    // article: PropTypes.shape({
    //     i
    // })
}

Article.defaultProps = {
    showContent: true,
    showCaption: false,
}

export default Article