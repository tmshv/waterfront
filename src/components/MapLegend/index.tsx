import * as React from 'react'

import { SET_LAYER_VISIBLE } from '../../app/actions'
import { ILegend } from '../../app/types'
import { LegendBlock } from './LegendBlock'
import { LegendAction } from '../../app/reducers/legendReducer'

export interface IMapLegendProps {
    data: ILegend
    onChangeItemSelected: (action: LegendAction) => void
}

export const MapLegend: React.FC<IMapLegendProps> = props => (
    <div>
        <style jsx>{`
            div {
                color: white;
            }
        `}</style>

        {props.data.blocks.map((x, blockIndex) => (
            <LegendBlock
                key={blockIndex}
                data={x}
                visibleIndex={props.data.visible}
                onChangeItemSelected={(itemId, checked) => {
                    props.onChangeItemSelected({
                        type: SET_LAYER_VISIBLE,
                        payload: {
                            blockIndex,
                            itemId,
                            visible: checked,
                        },
                    })
                }}
            />
        ))}
    </div>
)
