import { SET_LAYER_VISIBLE } from '../actions'

export default (state, action) => {
    switch (action.type) {
        case SET_LAYER_VISIBLE: {
            const payload = action.payload
            const legend = state.legend.map((block, blockIndex) => {
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

            return {
                ...state,
                legend,
            }
        }

        default: {
            return state
        }
    }
}
