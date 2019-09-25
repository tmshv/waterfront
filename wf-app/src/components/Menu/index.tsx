import * as React from 'react'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Icon from '@mdi/react'
import { useLocalStorage } from '@rehooks/local-storage';

import Logo from '../Logo'
import { createDefaultMenuItems } from './lib'

const LangButton = dynamic(() => import('../LangButton'), {
    ssr: false,
})

const target = (newTab?: boolean) => newTab ? '_blank' : undefined

export interface IMenuItem {
    url: string
    name?: string
    icon?: string
    newTab?: boolean
    marginRight?: number
}

export interface IMenuProps {
    logoUrl?: string
    menuItemIconSize?: number
    menuItemMarginRight?: number
    menuItems?: IMenuItem[]
}

export const Menu: React.FC<IMenuProps> = ({
    logoUrl = '/',
    menuItemIconSize = 1.2,
    menuItemMarginRight = 40,
    menuItems = createDefaultMenuItems(),
}) => {
    const { t } = useTranslation()

    return (
        <div>
            <style jsx>{`
            div {
                padding: 0 20px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                background-color: rgba(255, 255, 255, 0.9);
            }
            
            section {
                display: flex;
                align-items: center;
            }

            ul {
                list-style: none;
                display: flex;
                align-items: center;

                margin: 0 50px;
            }
            
            a {
                font-size: 1.2em;
                color: rgb(0, 83, 108);

                //padding-bottom: 3px;
                //text-decoration: none;
                //border-bottom: 2px solid rgb(0, 83, 108);
            }

            a:hover {
                color: rgb(20, 120, 130);
                //border-bottom: 2px solid rgb(20, 120, 130);
            }

            li:last-child {
                margin-right: 0;
            }
        `}</style>

            <Link
                href={logoUrl}
            >
                <a>
                    <Logo
                        width={300}
                    />
                </a>
            </Link>

            <section>
                <ul>
                    {menuItems.map(x => (
                        <li
                            key={x.url}
                            style={{
                                marginRight: x.marginRight
                                    ? x.marginRight
                                    : menuItemMarginRight,
                            }}
                        >
                            <a
                                href={x.url}
                                target={target(x.newTab)}
                            >
                                {!x.name ? null : (
                                    <span>{t(x.name)}</span>
                                )}

                                {!x.icon ? null : (
                                    <Icon path={x.icon}
                                        size={menuItemIconSize}
                                        color={'rgb(0, 83, 108)'}
                                    />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

                <LangButton/>
            </section>
        </div>
    )
}
