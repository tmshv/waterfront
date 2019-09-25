import * as React from 'react'
import { head, tail, chunk } from 'lodash'
import Link from 'next/link'
import { IArticle } from '../../app/types'
import { ArticleCard } from '../ArticleCard'
import { Article } from '../Article'
import { splitIntoColumns } from './lib'

const HeadArticle = (props) => (
    <Link
        href={props.item.url}
    >
        <a>
            <Article
                article={props.item}
                showContent={false}
                showCaption={true}
            />
        </a>
    </Link>
)

export interface IArticleCardListProps {
    highlightFirst: boolean
    items: IArticle[]
    columns: number
}

export const ArticleCardList: React.FC<IArticleCardListProps> = props => {
    const width = 100 / props.columns
    const cardItems = props.highlightFirst ? tail(props.items) : props.items
    const cardColumns = splitIntoColumns(cardItems, props.columns)

    return (
        <div>
            <style jsx>{`
                .column-container {
                    display: flex;
                    flex-direction: row;
                }

                .column {
                    display: flex;
                    flex-direction: column;

                    width: ${width}%;
                    box-sizing: border-box;

                    padding-right: 1px;
                }
                
                .column:last-child {
                    padding-right: 0;
                }
            `}</style>

            {!props.highlightFirst ? null : (
                <section
                    style={{
                        width: '100%',
                        marginBottom: 1,
                    }}
                >
                    <HeadArticle
                        item={head(props.items)}
                    />
                </section>
            )}

            <section className={'column-container'}>
                {cardColumns.map((columnItems, i) => (
                    <div
                        key={i}
                        className={'column'}
                    >
                        {columnItems.map(article => (
                            <ArticleCard
                                key={article.slug}
                                article={article}
                                style={{
                                    marginBottom: '2em',
                                }}
                            />
                        ))}
                    </div>
                ))}
            </section>
        </div>
    )
}
