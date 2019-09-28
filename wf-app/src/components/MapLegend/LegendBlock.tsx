import * as React from 'react'

import Checkbox from '../Checkbox'
import { ILegendBlock } from '../../app/types'

export interface ILegendBlockProps {
    data: ILegendBlock
    onChangeItemSelected: (itemIndex: number, checked: boolean) => void
}

export const LegendBlock: React.FC<ILegendBlockProps> = props => {
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
                {props.data.items.map((x, itemIndex) => (
                    <li
                        key={itemIndex}
                        style={{
                            backgroundColor: x.color,
                        }}
                    >
                        <Checkbox
                            label={x.name}
                            checked={x.checked}
                            onChange={
                                event => props.onChangeItemSelected(itemIndex, event.target.checked)
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}