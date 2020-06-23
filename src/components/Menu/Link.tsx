import s from './link.module.css'

import NextLink from 'next/link'

export interface ILinkProps {
    href: string
    active: boolean
}

export const Link: React.FC<ILinkProps> = props => {
    if (props.active) {
        return (
            <span className={s.active}>{props.children}</span>
        )
    }
    return (
        <NextLink
            href={props.href}
        >
            <a>
                <span>{props.children}</span>
            </a>
        </NextLink>
    )
}
