import styles from './styles.module.css'

export interface IContactProps {
    tel: string
    email: string
}

export const Contact: React.FC<IContactProps> = props => (
    <section className={styles.contact}>
        <span>
            {props.children}
        </span>

        <span> 
            <a className={styles.link} href={`tel:${props.tel}`}>
                {props.tel}
            </a>
            <a className={styles.link} href={`mailto:${props.email}`}>
                {props.email}
            </a>
        </span>
    </section>
)
