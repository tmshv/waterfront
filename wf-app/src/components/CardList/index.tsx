import * as React from 'react'
import { head } from 'lodash'
import { splitIntoColumns } from './lib'

export interface ICardListProps<T> {
    style?: React.CSSProperties
    items: T[]
    columns: number
    renderItem: (item: T, style: React.CSSProperties) => React.ReactNode
    renderFirstItem?: (item: T) => React.ReactNode
}

export function CardList<T>(props: ICardListProps<T>) {
    const width = 100 / props.columns
    const cardItems = props.items
    const cardColumns = splitIntoColumns(cardItems, props.columns)

    return (
        <div style={props.style}>
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

                    padding-right: var(--size-l);
                }
                
                .column:last-child {
                    padding-right: 0;
                }
            `}</style>

            <section className={'column-container'}>
                {cardColumns.map((columnItems, i) => (
                    <div
                        key={i}
                        className={'column'}
                    >
                        {columnItems.map(
                            x => props.renderItem(x, {
                                marginBottom: 'var(--size-xl)',
                            })
                        )}
                    </div>
                ))}
            </section>
        </div>
    )
}
