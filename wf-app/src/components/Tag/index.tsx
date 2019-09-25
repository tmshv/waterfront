import * as React from 'react'

export interface ITagProps {
    style?: React.CSSProperties
    // children: string
}

export const Tag: React.FC<ITagProps> = props => (
    <span
        style={props.style}
    >
        <style jsx>{`
            span {
                display: inline-block;

                background-color: var(--background-color);
                padding: 3px 9px;
            }
        `}</style>

        {props.children}
    </span>
)
