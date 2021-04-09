import { createContext } from 'react'

export type ControlsSize = 'default' | 'small' | 'big'
export type ControlsShape = 'pill' | 'default'

export type Controls = {
    size: ControlsSize
    shape?: ControlsShape
}

export const ControlsContext = createContext<Controls>({
    size: 'default',
    shape: 'pill',
})
