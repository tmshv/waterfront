import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { renderMarkdown } from '../../lib'

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

                a {
                    text-decoration: none;
                    color: black;
                }

                a:hover {
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

                    {!props.article.short ? null : (
                        <p
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(props.article.short) }}
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