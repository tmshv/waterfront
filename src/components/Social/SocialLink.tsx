import styles from './styles.module.css'

import Icon from '@mdi/react'

export interface ISocialLinkProps {
    href: string
    icon: string
    size: number
}

export const SocialLink: React.FC<ISocialLinkProps> = props => {
    return (
        <a
            href={props.href}
            target={'_blank'}
            className={styles.link}
        >
            <Icon path={props.icon}
                size={props.size}
                className={styles.icon}
            />
        </a>
    )
}
