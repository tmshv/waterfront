import * as React from 'react'
import { IArticle } from '../../app/types'
import { ArticleHead } from './ArticleHead'

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

export interface IArticleProps {
    article: IArticle,
    showContent?: boolean,
    showCaption?: boolean,
    after?: React.ReactNode,
}

export const Article: React.FC<IArticleProps> = ({ showContent = true, showCaption = false, ...props }) => {
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
            >
                <Image
                    src={props.article.previewImage}
                    alt={props.article.name}
                />
            </ArticleHead>

            {!showContent ? null : (
                <div
                    dangerouslySetInnerHTML={{ __html: props.article.body }}
                />
            )}

            {!props.after ? null : (
                <div>
                    {props.after}
                </div>
            )}
        </article>
    )
}
