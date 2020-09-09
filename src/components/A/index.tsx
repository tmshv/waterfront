import Link from 'next/link'
import MobileStoreButton from 'react-mobile-store-button'

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

    if (isIos(props.href)) {
        return (
            <MobileStoreButton
                store={'ios'}
                url={props.href}
            />
        )
    }

    if (isGooglePlay(props.href)) {
        return (
            <MobileStoreButton
                store={'android'}
                url={props.href}
            />
        )
    }

    return (
        <Link href={props.href}>
            <a>{props.children}</a>
        </Link>
    )
}