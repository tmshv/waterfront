import styles from './styles.module.css'

import { Footer } from '../Footer'
import { DefaultLayout } from '../DefaultLayout'
import { Header } from '../Header'
import { Navigation } from '../Navigation'
import Sidebar from 'react-sidebar'
import { useMobile } from 'src/hooks/useMobile'
import { MenuButton } from '../MenuButton'
import { useState } from 'react'
import { MenuContext } from 'src/context/menu'
import { menu } from 'src/app/const'

interface IPageLayoutProps {
    head?: React.ReactNode
    wideBody?: boolean
    extraSidebar?: React.ReactNode
}

export const PageLayout: React.FC<IPageLayoutProps> = props => {
    const isMobile = useMobile()
    const [showSide, setShowSide] = useState(false)

    return (
        <MenuContext.Provider value={menu}>
            <Sidebar
                sidebar={(
                    <div className={styles.sidebar}>
                        <Navigation
                            layout={'vertical'}
                            style={{
                                marginBottom: 'var(--size-xxl)',
                            }}
                        />

                        {props.extraSidebar}
                    </div>
                )}
                open={showSide}
                onSetOpen={(value) => {
                    setShowSide(value)
                }}
                styles={{ sidebar: { background: "white" } }}
            >
                <DefaultLayout
                    wideMain={props.wideBody}
                    navigation={(
                        <Header
                            layout={'horizontal'}
                        >
                            {isMobile ? (
                                <MenuButton
                                    onClick={() => {
                                        setShowSide(true)
                                    }}
                                />
                            ) : (
                                    <Navigation
                                        layout={'horizontal'}
                                    />
                                )}
                        </Header>
                    )}
                    head={props.head}
                    main={props.children}
                    footer={(
                        <Footer />
                    )}
                />
            </Sidebar>
        </MenuContext.Provider>
    )
}
