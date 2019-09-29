import * as React from 'react'

export interface IVsgCirclesProps {
    onClick?: () => void
    size: number
    children: Array<{
        color: string,
        size: number,
    }>
}

export const SvgCircles: React.FC<IVsgCirclesProps> = ({ size, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
            transform: `translate(${-size / 2},${-size / 2})`,
            display: 'block',
            cursor: 'pointer',
        }}
        onClick={props.onClick}
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
