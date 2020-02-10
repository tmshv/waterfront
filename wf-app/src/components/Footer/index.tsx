import styles from './styles.module.css'

import { ContactList } from '../ContactList'
import { contacts } from 'src/app/const'

const year = () => (new Date()).getFullYear()

const Delimiter: React.FC = () => (
    <span className={styles.delimiter}>/</span>
)

export const Footer: React.FC = () => (
    <footer className={styles.container}>
        <section className={styles.section}>
            waterfront.tools
            <Delimiter />
            {year()}
        </section>

        <section className={styles.section}>
            <ContactList
                items={contacts}
            />
        </section>
    </footer>
)
