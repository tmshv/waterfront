import styles from './styles.module.css'

export type ContactProps = {
    href: string
    label: string
}

export const Contact: React.FC<ContactProps> = ({ href, label }) => (
    <a className={styles.link} href={href}>
        {label}
    </a>
)
