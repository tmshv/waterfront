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
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
    wideMain = false,
    ...props
}) => {
    const { screen, mainMarginBottom, mainMarginTop, backgroundColor, showFooter } = useContext(LayoutContext)

    return (
        <div
            className={cx(styles.container, {
                [styles.fullHeight]: screen,
            })}
            style={{
                backgroundColor,
            }}
        >
            <header className={styles.header}>
                {props.navigation}
            </header>

            {!props.head ? null : (
                props.head
            )}

            <main className={cx(styles.main, {
                [styles.fullWidth]: wideMain,
                [styles.marginBottom]: mainMarginBottom,
                [styles.marginTop]: mainMarginTop,
            })}>
                {props.main}
            </main>

            {props.footer}
        </div>
    )
}