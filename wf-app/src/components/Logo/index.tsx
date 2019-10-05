import * as React from 'react'

export const Logo: React.FC<{width?: number}> = ({width = 100}) => {
    return <img
        style={{
            width,
        }}
        src={'/static/waterfront.svg'}
    />
}
