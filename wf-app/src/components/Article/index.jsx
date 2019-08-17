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

                .overlay {
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

                .caption {
                    position: relative;
                    margin-left: 15px;
                    padding: 15px;
                    width: 50%;
                    min-width: 300px;
                }

                .caption-text {
                    position: relative;

                    color: white;
                    text-shadow: 0px 0px 1px #666;
                    z-index: 1;
                }

                .caption-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    right: 0;

                    background-color: rgb(90, 200, 240);
                    mix-blend-mode: hard-light;
                }
            `}</style>

            {props.children}

            <div className={'overlay'}>
                <h1>
                    {props.title}
                </h1>

                {!props.showCaption || !props.caption ? null : (
                    <div className={'caption'}>
                        <div className={'caption-overlay'}/>
                        <p className={'caption-text'}
                            dangerouslySetInnerHTML={{ __html: props.caption }}
                        />
                    </div>
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

            {/* <div>
                {props.after}
            </div> */}
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