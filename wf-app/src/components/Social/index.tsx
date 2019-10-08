import * as React from 'react'

import cx from 'classnames'
import { SocialLink } from './SocialLink'

export interface ISocialItem {
    url: string
    icon: string
}

export interface ISocialProps {
    style?: React.CSSProperties
    color: string
    iconSize: number
    items: ISocialItem[]
    layout: 'horizontal' | 'vertical'
}

export const Social: React.FC<ISocialProps> = props => {
    return (
        <ul style={props.style} className={cx(props.layout)}>
            <style jsx>{`
                ul {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    margin: 0;
                    padding: 0;
                }

                ul.horizontal {
                    flex-direction: row;
                }
                
                li {
                    margin-right: 20px;
                }

                li:last-child {
                    margin-right: 0;
                }
            `}</style>

            {props.items.map(x => (
                <li
                    key={x.url}
                >
                    <SocialLink
                        href={x.url}
                        icon={x.icon}
                        size={props.iconSize}
                        color={props.color}
                    />
                </li>
            ))}
        </ul>
    )
}
