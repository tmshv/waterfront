import { SET_LAYER_VISIBLE, SET_LAYER_VISIBLE_INVERSE } from '../actions'
import { ILegendItem } from '../types'

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

export default (state: ILegendItem[] = [], action: LegendAction) => {
    switch (action.type) {
        case SET_LAYER_VISIBLE: {
            const payload = action.payload

            return state.map((block, blockIndex) => {
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

        default: {
            return state
        }
    }
}
