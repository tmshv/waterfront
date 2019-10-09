import * as React from 'react'

import Link from 'next/link'
import cx from 'classnames'

import { Logo } from '../Logo'
import { Navigation } from '../Navigation'

export interface IHeaderProps {
    layout: 'vertical' | 'horizontal'
}

export const Header: React.FC<IHeaderProps> = props => {
    const logoUrl = '/'

    return (
        <div className={cx(props.layout)}>
            <style jsx>{`
                div {
                    padding: 10px 20px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;

                    background-color: rgba(255, 255, 255, 0.9);
                }

                div.horizontal {
                    padding: 0 10px;
                    height: 60px;
                    flex-direction: row;
                    align-items: center;
                }

                a {
                    display: block;
                    width: 100%;
                    min-width: 200px;
                    max-width: 270px;
                }
            `}</style>

            <Link
                href={logoUrl}
            >
                <a>
                    <Logo
                        width={'100%'}
                    />
                </a>
            </Link>

            <section>
                {props.children}
            </section>
        </div>
    )
}
