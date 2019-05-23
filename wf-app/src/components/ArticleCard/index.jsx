import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const ArticleCard = (props) => {
    return (
        <div
            style={props.style}
        >
            <style jsx>{`
                div {
                    min-width: 300px;
                    width: 25%;
                    //width: 33.333%;

                    box-sizing: border-box;
                }

                img {
                    display: block;
                    width: 100%;
                }

                p {
                    padding: 0 10px;
                    line-height: 1.5em;
                }

                h2 {
                    padding: 0 10px;
                    color: rgb(90, 200, 240);
                }

                a {
                    text-decoration: none;
                    color: black;
                }

                a:hover {
                    color: rgb(0, 83, 108);
                }

                a:hover h2 {
                    color: rgb(0, 83, 108);
                }
            `}</style>

            <Link
                href={props.article.url}
            >
                <a>
                    <img
                        src={props.article.previewImage}
                    />

                    <h2>
                        {props.article.name}
                    </h2>

                    {!props.article.short ? null : (
                        <p
                            dangerouslySetInnerHTML={{ __html: props.article.short }}
                        />
                    )}
                </a>
            </Link>
        </div>
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object,
}

export default ArticleCard