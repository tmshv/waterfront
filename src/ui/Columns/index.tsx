import s from './columns.module.css'

import React, { memo } from 'react'

export type ColumnsProps = {
    layout?: string
    style?: React.CSSProperties
}

export type ColumnProps = {
    style?: React.CSSProperties
}

export const Columns: React.FC<ColumnsProps> = memo(props => {
    let gridTemplateColumns = `repeat(${React.Children.count(props.children)}, 1fr)`
    if (props.layout) {
        gridTemplateColumns = props.layout
    }

    return (
        <div
            className={s.columns}
            style={{
                gridTemplateColumns,
                ...props.style,
            }}
        >
            {React.Children.map(props.children, (element, index) => (
                React.cloneElement(element as any, {})
            ))}
        </div>
    )
})
