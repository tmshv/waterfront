import * as React from 'react'
import { IArticle } from '../../app/types'

import './styles.css'

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
                    margin: 0 auto;
                    padding-top: 60px;
                }

                @media screen and (max-width: 31.25em) {
                    div {
                        width: 100%;
                    }
                }
            `}</style>

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
