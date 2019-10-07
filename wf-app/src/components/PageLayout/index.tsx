import * as React from 'react'

import { Menu } from '../Menu'
import Footer from '../Footer'
import { DefaultLayout } from '../DefaultLayout'
import { useLayout } from '../../hooks/useLayout'
import { Header } from '../Header'
import { PageHead } from '../PageHead'

interface IPageLayoutProps {
    head?: {
        title: string
        caption?: string
        image: string | number
    }
}

export const PageLayout: React.FC<IPageLayoutProps> = props => {
    const layout = useLayout()

    return (
        <DefaultLayout
            navigation={(
                <Header
                    layout={layout}
                >
                    <Menu
                        layout={layout}
                    />
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
    )
}
