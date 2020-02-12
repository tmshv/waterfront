import cx from 'classnames'

import { Menu } from '../Menu'
import { Social } from '../Social'
import { social, menu } from '../../app/const'
import { useMemo } from 'react'

export interface INavigationProps {
    style?: React.CSSProperties
    layout: 'horizontal' | 'vertical'
}

export const Navigation: React.FC<INavigationProps> = props => {
    const menuStyle = useMemo(() => props.layout === 'horizontal'
        ? {
            marginRight: 20,
        } : {
            marginBottom: 20,
        },
        [props.layout]
    )

    const socialStyle = useMemo(() => props.layout === 'horizontal'
        ? {
            marginRight: 0,
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
                color={'var(--color-text-opposite)'}
                iconSize={1}
                items={social}
                layout={'horizontal'}
                style={socialStyle}
            />
        </div>
    )
}
