import s from './store.module.css'

import Link from 'next/link'
import cx from 'classnames'
import { useRouter } from 'next/router'

const androidPattern = /https:\/\/play\.google\.com\/store\/apps\/details\?id=.+/
const iosPattern = /https:\/\/apps\.apple\.com\/.{2}\/app\/.+/

function isGooglePlay(href: string) {
    return androidPattern.test(href)
}

function isIos(href: string) {
    return iosPattern.test(href)
}

export type AProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    href: string
}

export const A: React.FC<AProps> = props => {
    const router = useRouter()
    const active = !!props.href && (router && router.asPath !== props.href)
    if (!active) {
        return (
            <span>{props.children}</span>
        )
    }

    return (
        <Link href={props.href}
            className={cx({
                [s.ios]: isIos(props.href),
                [s.android]: isGooglePlay(props.href),
            })}
        >
            {props.children}
        </Link>
    )
}