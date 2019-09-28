import * as React from 'react'

import { SET_LAYER_VISIBLE } from '../../app/actions'
import { ILegendItem } from '../../app/types'
import { LegendBlock } from './LegendBlock'

export interface IMapLegendProps {
    data: ILegendItem[]
    onChangeItemSelected: (action: any) => void
}

export const MapLegend: React.FC<IMapLegendProps> = props => (
    <div>
        <style jsx>{`
            div {
                color: white;
                padding: 15px;
            }
        `}</style>

        {props.data.map((x, blockIndex) => (
            <LegendBlock
                data={x}
                onChangeItemSelected={(itemIndex, checked) => {
                    this.props.onChangeItemSelected({
                        type: SET_LAYER_VISIBLE,
                        payload: {
                            blockIndex,
                            itemIndex,
                            visible: checked,
                        },
                    })
                }}
            />
        ))}
    </div>
)
