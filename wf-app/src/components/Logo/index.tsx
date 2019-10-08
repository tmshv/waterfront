import * as React from 'react'

export const Logo: React.FC<{ width?: number | string }> = ({ width = 100 }) => {
    return <img
        style={{
            width,
            display: 'block',
        }}
        src={'/static/waterfront.svg'}
    />
}
