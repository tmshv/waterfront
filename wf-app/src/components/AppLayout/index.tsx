import * as React from 'react'
import { DesktopLayout } from './DesktopLayout'
import Sidebar from 'react-sidebar'
import { Header } from '../Header'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'

interface IAppLayoutProps {
    side: React.ReactNode
}

export const AppLayout: React.FC<IAppLayoutProps> = props => {
    const [showSide, setShowSide] = React.useState(false)
    const isMobile = useMobile()
    const layout = !isMobile ? 'horizontal' : 'vertical'

    const head = (
        <Header
            layout={layout}
        >
            <Menu
                layout={layout}
            />
        </Header>
    )

    if (!isMobile) {
        return (
            <DesktopLayout
                back={props.children}
                head={head}
            >
                {props.side}
            </DesktopLayout>
        )
    }

    return (
        <Sidebar
            sidebar={(
                <div>
                    {head}
                    {props.side}
                </div>
            )}
            open={showSide}
            onSetOpen={(value) => {
                setShowSide(value)
            }}
            styles={{ sidebar: { background: "white" } }}
        >
            <style jsx>{`
                .overlay-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            `}</style>

            {props.children}

            <div className={'overlay-content'}>
                <button
                    onClick={() => setShowSide(true)}
                >
                    Open
                </button>
            </div>
        </Sidebar>
    )
}
