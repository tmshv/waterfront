import * as React from 'react'

import dynamic from 'next/dynamic'
import cx from 'classnames'

import { Menu } from '../Menu'
import { Social } from '../Social'
import { social, menu } from '../../app/const'

const LangButton = dynamic(() => import('../LangButton'), {
    ssr: false,
})

export interface INavigationProps {
    style?: React.CSSProperties
    layout: 'horizontal' | 'vertical'
}

export const Navigation: React.FC<INavigationProps> = props => {
    const menuStyle = React.useMemo(() => props.layout === 'horizontal'
        ? {
            marginRight: 20,
        } : {
            marginBottom: 20,
        },
        [props.layout]
    )

    const socialStyle = React.useMemo(() => props.layout === 'horizontal'
        ? {
            marginRight: 25,
        } : {
            marginBottom: 20,
        },
        [props.layout]
    )

    return (
        <div style={props.style} className={cx(props.layout)}>
            <style jsx>{`
                div {
                    display: flex;
                }

                div.horizontal {
                    flex-direction: row;
                    align-items: center;
                }

                div.vertical {
                    flex-direction: column;
                    align-items: flex-start;
                }
            `}</style>

            <Menu
                layout={'horizontal'}
                items={menu}
                style={menuStyle}
            />

            <Social
                color={'rgb(0, 83, 108)'}
                iconSize={1}
                items={social}
                layout={'horizontal'}
                style={socialStyle}
            />

            <LangButton />
        </div>
    )
}
