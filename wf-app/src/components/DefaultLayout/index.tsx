import * as React from 'react'

import cx from 'classnames'

export interface IDefaultLayoutProps {
    navigation: React.ReactNode
    head?: React.ReactNode
    main: React.ReactNode
    footer: React.ReactNode
    wideMain?: boolean
    borderless?: boolean
    showFooter?: boolean
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
    borderless = false,
    wideMain = false,
    showFooter = true,
    ...props
}) => (
        <div>
            <style jsx>{`
            div {
                display: flex;
                flex-direction: column;
                align-items: center;

                background-color: var(--background-color);
                height: 100%;
            }

            main {
                width: 70%;
                flex: 1;

                margin-bottom: 50px;
                box-sizing: border-box;
            }

            main.borderless {
                margin-bottom: 0px;
            }

            main.wide {
                width: 100%;
            }

            section {
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

            @media screen and (max-width: 31.25em) {
                main {
                    width: 100%;
                    padding: 0 10px;
                    box-sizing: border-box;
                }

                main.borderless {
                    padding: 0px;
                }
            }
        `}</style>

            <header>
                {props.navigation}
            </header>
            {!props.head ? null : (
                <section>
                    {props.head}
                </section>
            )}
            <main className={cx({
                wide: wideMain,
                borderless,
            })}>
                {props.main}
            </main>
            {!showFooter ? null : (
                <footer>
                    {props.footer}
                </footer>
            )}
        </div>
    )
