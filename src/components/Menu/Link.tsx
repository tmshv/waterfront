import s from './link.module.css'

import NextLink from 'next/link'
import cx from 'classnames'

export interface ILinkProps {
    href: string
    active: boolean
}

export const Link: React.FC<ILinkProps> = props => {
    if (props.active) {
        return (
            <span className={cx(s.item, { [s.active]: props.active })}>{props.children}</span>
        )
    }
    return (
        <NextLink
            href={props.href}
        >
            <span>{props.children}</span>
        </NextLink>
    )
}
