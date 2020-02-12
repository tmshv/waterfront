import styles from './styles.module.css'

import { ContactList } from '../ContactList'
import LangButton from '../LangButton'
import { contacts } from 'src/app/const'
import cx from 'classnames'

const year = () => (new Date()).getFullYear()

const Delimiter: React.FC = () => (
    <span className={styles.delimiter}>/</span>
)

export const Footer: React.FC = () => (
    <footer className={styles.container}>
        <section className={cx(styles.section, styles.vertical)}>
            <div className={styles.copyright}>
                waterfront.tools
                <Delimiter />
                {year()}
            </div>

            <div>
                <LangButton />
            </div>
        </section>

        <section className={styles.section}>
            <ContactList
                items={contacts}
            />
        </section>
    </footer>
)
