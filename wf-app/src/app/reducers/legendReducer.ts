import { SET_LAYER_VISIBLE, SET_LAYER_VISIBLE_INVERSE } from '../actions'
import { ILegend } from '../types'

const initialState: ILegend = {
    blocks: [],
    visible: {},
}

export type LegendAction =
    | {
        type: typeof SET_LAYER_VISIBLE, payload: {
            blockIndex: number,
            itemIndex: number,
            visible: boolean,
        }
    }
    | {
        type: typeof SET_LAYER_VISIBLE_INVERSE, payload: {
            blockIndex: number,
            itemIndex: number,
            visible: boolean,
        }
    }

export default (state: ILegend = initialState, action: LegendAction) => {
    switch (action.type) {
        case SET_LAYER_VISIBLE: {
            const payload = action.payload

            return {
                ...state,
                blocks: state.blocks.map((block, blockIndex) => {
                    if (blockIndex !== payload.blockIndex) {
                        return block
                    }

                    const items = block.items.map((item, itemIndex) => {
                        if (itemIndex !== payload.itemIndex) {
                            return item
                        }

                        return {
                            ...item,
                            checked: payload.visible,
                        }
                    })

                    return {
                        ...block,
                        items,
                    }
                })
            }
        }

        default: {
            return state
        }
    }
}
