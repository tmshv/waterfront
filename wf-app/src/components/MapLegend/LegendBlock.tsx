import * as React from 'react'

import Checkbox from '../Checkbox'
import { ILegendBlock } from '../../app/types'
import { isLayerVisible } from '../../app/map'

export interface ILegendBlockProps {
    data: ILegendBlock
    visibleIndex: {
        [id: string]: boolean
    }
    onChangeItemSelected: (itemId: string, checked: boolean) => void
}

export const LegendBlock: React.FC<ILegendBlockProps> = props => {
    const isVisible = React.useCallback(
        (id: string) => isLayerVisible(id, props.visibleIndex),
        [props.visibleIndex],
    )

    return (
        <div>
            <style jsx>{`
                header {
                    font-size: 1.2em;
                    color: black;

                    padding: 2px 5px;
                    margin-bottom: 5px;
                }

                div {
                    margin-bottom: 15px;
                }

                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }

                ul li {
                    padding: 2px 5px;
                }
            `}</style>

            <header>{props.data.title}</header>

            <ul>
                {props.data.items.map(x => (
                    <li
                        key={x.id}
                        style={{
                            backgroundColor: x.color,
                        }}
                    >
                        <Checkbox
                            label={x.name}
                            checked={isVisible(x.id)}
                            onChange={
                                event => props.onChangeItemSelected(x.id, event.target.checked)
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}