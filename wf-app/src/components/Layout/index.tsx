import { LayoutContext } from 'src/context/layout'
import { defaultLayout } from 'src/app/const'

export const Article: React.FC = props => {
    return (
        <LayoutContext.Provider value={{
            ...defaultLayout,
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
}

export const Map: React.FC = props => {
    return (
        <LayoutContext.Provider value={{
            ...defaultLayout,
            screen: true,
            mainMarginTop: false,
            mainMarginBottom: false,
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
}

export const Cards: React.FC = props => {
    return (
        <LayoutContext.Provider value={{
            ...defaultLayout,
            mainMarginTop: false,
            backgroundColor: 'var(--body-background-color)',
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
}