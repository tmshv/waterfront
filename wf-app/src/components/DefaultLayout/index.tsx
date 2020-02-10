import styles from './styles.module.css'

import cx from 'classnames'
import { LayoutContext } from 'src/context/layout'
import { useContext } from 'react'

export interface IDefaultLayoutProps {
    navigation: React.ReactNode
    head?: React.ReactNode
    main: React.ReactNode
    footer: React.ReactNode
    wideMain?: boolean
    showFooter?: boolean
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
    wideMain = false,
    showFooter = true,
    ...props
}) => {
    const { screen, mainBottomMargin } = useContext(LayoutContext)

    return (
        <div className={cx(styles.container, {
            [styles.fullHeight]: screen,
        })}>
            <header className={styles.header}>
                {props.navigation}
            </header>
            {!props.head ? null : (
                <section className={styles.head}>
                    {props.head}
                </section>
            )}

            <main className={cx(styles.main, {
                [styles.fullWidth]: wideMain,
                [styles.bottomMargin]: mainBottomMargin,
            })}>
                {props.main}
            </main>

            {!showFooter ? null : (
                <footer className={styles.footer}>
                    {props.footer}
                </footer>
            )}
        </div>
    )
}