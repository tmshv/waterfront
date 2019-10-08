import * as React from 'react'
import { head, tail } from 'lodash'
import { splitIntoColumns } from './lib'

export interface ICardListProps<T> {
    style?: React.CSSProperties
    highlightFirst: boolean
    items: T[]
    columns: number
    renderItem: (item: T) => React.ReactNode
    renderFirstItem?: (item: T) => React.ReactNode
}

export function CardList<T>(props: ICardListProps<T>) {
    const width = 100 / props.columns
    const cardItems = props.highlightFirst ? tail(props.items) : props.items
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
                    {props.renderFirstItem!(
                        head(props.items)!
                    )}
                </section>
            )}

            <section className={'column-container'}>
                {cardColumns.map((columnItems, i) => (
                    <div
                        key={i}
                        className={'column'}
                    >
                        {columnItems.map(
                            x => props.renderItem(x)
                        )}
                    </div>
                ))}
            </section>
        </div>
    )
}
