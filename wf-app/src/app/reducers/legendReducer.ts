import { SET_LAYER_VISIBLE, SET_LAYER_VISIBLE_INVERSE, LEGEND_BLOCKS_UPDATE } from '../actions'
import { ILegend, ILegendBlock } from '../types'

const initialState: ILegend = {
    blocks: [],
    visible: {},
}

export type LegendAction =
    | {
        type: typeof LEGEND_BLOCKS_UPDATE, payload: ILegendBlock[]
    }
    | {
        type: typeof SET_LAYER_VISIBLE, payload: {
            blockIndex: number,
            itemId: string,
            visible: boolean,
        }
    }
    | {
        type: typeof SET_LAYER_VISIBLE_INVERSE, payload: {
            blockIndex: number,
            itemId: string,
            visible: boolean,
        }
    }

export default (state: ILegend = initialState, action: LegendAction) => {
    switch (action.type) {
        case LEGEND_BLOCKS_UPDATE: {
            return {
                ...state,
                blocks: action.payload,
            }
        }

        case SET_LAYER_VISIBLE: {
            const payload = action.payload
            const visible = {
                ...state.visible,
                [payload.itemId]: payload.visible,
            }

            return {
                ...state,
            }
        }

        default: {
            return state
        }
    }
}
