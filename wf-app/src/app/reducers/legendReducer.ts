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
