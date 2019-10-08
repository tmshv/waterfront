import * as React from 'react'

import Footer from '../Footer'
import { DefaultLayout } from '../DefaultLayout'
import { Header } from '../Header'
import { PageHead } from '../PageHead'
import { Navigation } from '../Navigation'
import Sidebar from 'react-sidebar'
import { useMobile } from '../../hooks/useMobile'
import { MenuButton } from '../MenuButton'

interface IPageLayoutProps {
    head?: {
        title: string
        caption?: string
        image: string | number
    }
    wideBody?: boolean
    borderless?: boolean
    showFooter?: boolean
}

export const PageLayout: React.FC<IPageLayoutProps> = props => {
    const isMobile = useMobile()
    const [showSide, setShowSide] = React.useState(false)

    return (
        <Sidebar
            sidebar={(
                <div>
                    <style jsx>{`
                        div {
                            padding: 20px;
                        }
                    `}</style>
                    <Navigation
                        layout={'vertical'}
                    />
                </div>
            )}
            open={showSide}
            onSetOpen={(value) => {
                setShowSide(value)
            }}
            styles={{ sidebar: { background: "white" } }}
        >
            <DefaultLayout
                borderless={props.borderless}
                wideMain={props.wideBody}
                showFooter={props.showFooter}
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
                head={!props.head ? null : (
                    <PageHead
                        title={props.head.title}
                        caption={props.head.caption}
                        image={props.head.image}
                    />
                )}
                main={props.children}
                footer={(
                    <Footer />
                )}
            />
        </Sidebar>
    )
}
