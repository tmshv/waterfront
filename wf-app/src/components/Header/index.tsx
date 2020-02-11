import styles from './styles.module.css'

import Link from 'next/link'
import cx from 'classnames'
import { Logo } from '../Logo'

export interface IHeaderProps {
    layout: 'vertical' | 'horizontal'
}

export const Header: React.FC<IHeaderProps> = props => {
    const logoUrl = '/'

    return (
        <div className={cx(styles.container, {
            [styles.horizontal]: props.layout === 'horizontal',
        })}>
            <Link
                href={logoUrl}
            >
                <a className={styles.logo}>
                    <Logo />
                </a>
            </Link>

            <section>
                {props.children}
            </section>
        </div>
    )
}
