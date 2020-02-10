import * as React from 'react'
import Link from 'next/link'
import { IArticle } from '../../app/types'
import { Tag } from '../Tag'
import { ImageBlock } from '../ImageBlock'

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

                    background-color: var(--background-color);
                }

                p {
                    line-height: 1.5em;
                    padding: 0 10px;
                    
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                h2 {
                    padding: 0 10px;
                    color: rgb(90, 200, 240);

                    margin: 0.5em 0;
                }

                a {
                    display: block;
                    text-decoration: none;
                    color: black;

                    position: relative;
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
                    <ImageBlock src={props.article.previewImage}>
                        {!year ? null : (
                            <Tag>
                                {year}
                            </Tag>
                        )}
                    </ImageBlock>

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
