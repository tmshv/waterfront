import * as React from 'react'

export interface IDefaultLayoutProps{
    header: React.ReactNode
    main: React.ReactNode
    footer: React.ReactNode
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = props => (
    <div>
        <style jsx>{`
            div {
                display: flex;
                flex-direction: column;
                align-items: center;

                background-color: var(--background-color);
            }

            main {
                width: 100%;
                flex: 1;
            }

            header {
                width: 100%;
                background-color: white;
            }

            footer {
                width: 100%;

                background-color: var(--footer-background-color);
                color: white;

                padding: 20px 0;
            }
        `}</style>

        <header>
            {props.header}
        </header>
        <main>
            {props.main}
        </main>
        <footer>
            {props.footer}
        </footer>
    </div>
)
