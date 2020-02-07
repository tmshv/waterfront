import * as React from 'react'

export interface ISvgCirclesProps {
    value?: string
    onClick: (value: string) => void
    size: number
    children: Array<{
        color: string,
        size: number,
    }>
}

export const SvgCircles: React.FC<ISvgCirclesProps> = ({ size, ...props }) => {
    const onClick = React.useCallback(() => {
        if (props.value) {
            props.onClick(props.value)
        }
    }, [props.value])

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
                display: 'block',
                cursor: 'pointer',
            }}
            transform={`translate(${-size / 2},${-size / 2})`}
            onClick={onClick}
        >
            <g
                transform={`translate(${size / 2},${size / 2})`}
            >
                {props.children.map((x, i) => (
                    <circle
                        key={i}
                        cx={0}
                        cy={0}
                        r={x.size / 2}
                        style={{
                            fill: x.color,
                        }}
                    />
                ))}
            </g>
        </svg>
    )

}