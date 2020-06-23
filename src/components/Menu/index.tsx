import s from './menu.module.css'

import cx from 'classnames'
import { useMenuItems } from './lib'
import { Link } from './Link'

const layoutClass = new Map([
    ['horizontal', s.horizontal],
    ['vertical', null],
])

export interface IMenuProps {
    style?: React.CSSProperties
    layout: 'horizontal' | 'vertical'
}

export const Menu: React.FC<IMenuProps> = props => {
    const items = useMenuItems()

    return (
        <ul style={props.style} className={cx(s.menu, layoutClass.get(props.layout))}>
            {items.map(item => (
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
            ))}
        </ul>
    )
}
