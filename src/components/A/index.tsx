import s from './store.module.css'

import Link from 'next/link'
import cx from 'classnames'

const androidPattern = /https:\/\/play\.google\.com\/store\/apps\/details\?id=.+/
const iosPattern = /https:\/\/apps\.apple\.com\/.{2}\/app\/.+/

function isGooglePlay(href: string) {
    return androidPattern.test(href)
}

function isIos(href: string) {
    return iosPattern.test(href)
}

export type AProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const A: React.FC<AProps> = props => {
    if (!props.href) {
        return (
            <span>{props.children}</span>
        )
    }

    return (
        <Link href={props.href}>
            <a className={cx({
                [s.ios]: isIos(props.href),
                [s.android]: isGooglePlay(props.href),
            })}
            >{props.children}</a>
        </Link>
    )
}