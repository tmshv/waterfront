import * as React from 'react'
import { head, tail, chunk } from 'lodash'
import Link from 'next/link'
import { IArticleShort } from '../../app/types'
import {ArticleCard} from '../ArticleCard'
import Article from '../Article'

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
    items: IArticleShort[]
}

export const ArticleCardList: React.FC<IArticleCardListProps> = props => {
    const cardItems = props.highlightFirst ? tail(props.items) : props.items
    const cardColumns = chunk(
        cardItems,
        4,
    )

    return (
        <div>
            <style jsx>{`
                div {
                    //flex-wrap: wrap;
                }

                .column-container {
                    display: flex;
                }

                .column {
                    display: flex;
                    flex-direction: column;

                    width: 25%;
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
                                // style={{
                                //     paddingRight: 1,
                                //     paddingBottom: 1,
                                // }}
                            />
                        ))}
                    </div>
                ))}
            </section>
        </div>
    )
}
