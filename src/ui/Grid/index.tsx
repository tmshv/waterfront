import s from './grid.module.css'

import React, { memo } from 'react'
import { useMobile } from '@/hooks/useMobile'

export type GridProps = {
    columns: string
    style?: React.CSSProperties
}

export const Grid: React.FC<GridProps> = memo(props => {
    const isMobile = useMobile()
    let gridTemplateColumns = isMobile
        ? '1fr'
        : `repeat(${props.columns}, 1fr)`

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
