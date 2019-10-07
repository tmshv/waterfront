import * as React from 'react'

export interface IDefaultLayoutProps {
    navigation: React.ReactNode
    head: React.ReactNode
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
                width: 70%;
                flex: 1;

                margin-bottom: 50px;
            }

            section {
                width: 100%;
                flex: 1;
            }

            header {
                width: 100%;
                background-color: white;
                display: none;
            }

            footer {
                width: 100%;

                background-color: var(--footer-background-color);
                color: white;

                padding: 20px 0;
            }

            @media screen and (max-width: 31.25em) {
                main {
                    width: 100%;
                    padding: 0 15px;
                    box-sizing: border-box;
                }
            }
        `}</style>

        <header>
            {props.navigation}
        </header>
        <section>
            {props.head}
        </section>
        <main>
            {props.main}
        </main>
        <footer>
            {props.footer}
        </footer>
    </div>
)
