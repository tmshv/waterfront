import * as React from 'react'
import Link from 'next/link'
import { IArticle } from '../../app/types'

export interface IArticleCardProps {
    style?: React.CSSProperties
    article: IArticle
}

export const ArticleCard: React.FC<IArticleCardProps> = props => {
    const year = props.article.date
        ? props.article.date.getFullYear()
        : null

    return (
        <div
            style={props.style}
        >
            <style jsx>{`
                div {
                    box-sizing: border-box;
                }

                img {
                    display: block;
                    width: 100%;
                    object-fit: cover;
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
                    display: block;
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

                    {!year ? null : (
                        <p>
                            {year}
                        </p>
                    )}

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
