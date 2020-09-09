import Link from 'next/link'
import MobileStoreButton from 'react-mobile-store-button'

function isGooglePlay(href: string) {
    return /https:\/\/play\.google\.com\/store\/apps\/details\?id=.+/.test(href)
}

export type AProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const A: React.FC<AProps> = props => {
    if (!props.href) {
        return (
            <span>{props.children}</span>
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