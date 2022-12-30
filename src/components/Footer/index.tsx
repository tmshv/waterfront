import styles from './styles.module.css'

import LangButton from '../LangButton'
import cx from 'classnames'
import { Contact } from '../Contact'

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
            <Contact
                href={'mailto:team@waterfront.tools'}
                label={'team@waterfront.tools'}
            />
        </section>
    </footer>
)
