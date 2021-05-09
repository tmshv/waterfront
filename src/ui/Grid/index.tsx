import s from './grid.module.css'

import React, { memo } from 'react'

export type GridProps = {
    columns: string
    style?: React.CSSProperties
}

export const Grid: React.FC<GridProps> = memo(props => {
    let gridTemplateColumns = `repeat(${props.columns}, 1fr)`

    return (
        <div
            className={s.grid}
            style={{
                gridTemplateColumns,
                ...props.style,
            }}
        >
            {props.children}
        </div>
    )
})
