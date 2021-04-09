import s from './menu.module.css'

import cx from 'classnames'
import React, { cloneElement } from 'react'

const layoutClass = new Map([
    ['horizontal', s.horizontal],
    ['vertical', null],
])

export interface IMenuProps {
    style?: React.CSSProperties
    layout?: 'horizontal' | 'vertical'
}

export const Menu: React.FC<IMenuProps> = ({ layout = 'horizontal', ...props }) => {
    return (
        <ul style={props.style} className={cx(s.menu, layoutClass.get(layout))}>
            {/* {React.Children.map(props.children, element => (
                cloneElement(element, {
                    isCurrent
                })
            ))} */}
            {props.children}
            {/* {items.map(item => (
                <li
                    key={item.href}
                    className={s.item}
                >
                    <Link
                        href={item.href}
                        active={item.isCurrent}
                    >
                        {item.label}
                    </Link>
                </li>
            ))} */}
        </ul>
    )
}
