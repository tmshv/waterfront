import * as React from 'react'

import Link from 'next/link'
import cx from 'classnames'
import dynamic from 'next/dynamic'
import Icon from '@mdi/react'

import { Logo } from '../Logo'
import { Menu } from '../Menu'

const LangButton = dynamic(() => import('../LangButton'), {
    ssr: false,
})

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
                    padding: 0 20px;
                    height: 60px;
                    flex-direction: row;
                    align-items: center;
                }

                a {
                    display: block;
                    width: 100%;
                    min-width: 200px;
                    max-width: 300px;
                }
                
                section {
                    display: flex;
                    flex-direction: column;

                    margin: 20px 0;
                }

                section.horizontal {
                    margin: 0;

                    flex-direction: row;
                    align-items: center;
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

            <section className={cx(props.layout)}>
                <Menu
                    layout={props.layout}
                />
                <LangButton />
            </section>
        </div>
    )
}
