import * as React from 'react'

import { useTranslation } from '../../i18n'
import Link from 'next/link'
import Icon from '@mdi/react'
import cx from 'classnames'

import { createDefaultMenuItems } from './lib'

const target = (newTab?: boolean) => newTab ? '_blank' : undefined

export interface IMenuItem {
    url: string
    name?: string
    icon?: string
    newTab?: boolean
    marginRight?: number
}

export interface IMenuProps {
    menuItemIconSize?: number
    menuItemMarginRight?: number
    menuItems?: IMenuItem[]
    layout: 'horizontal' | 'vertical'
}

export const Menu: React.FC<IMenuProps> = ({
    menuItemIconSize = 1.2,
    menuItemMarginRight = 40,
    menuItems = createDefaultMenuItems(),
    ...props
}) => {
    const { t } = useTranslation()

    return (
        <ul className={cx(props.layout)}>
            <style jsx>{`
                ul {
                    list-style: none;
                    display: flex;
                    //align-items: center;

                    flex-direction: column;

                    //margin: 0 50px;
                    margin: 0;
                    padding: 0;
                }

                ul.horizontal {
                    flex-direction: row;
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

                li {
                    margin-right: 20px;
                }

                li:last-child {
                    margin-right: 0;
                }
            `}</style>

            {menuItems.map(x => (
                <li
                    key={x.url}
                    // style={{
                    //     marginRight: x.marginRight
                    //         ? x.marginRight
                    //         : menuItemMarginRight,
                    // }}
                >
                    <Link
                        href={x.url}
                    >
                        <a
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
                    </Link>
                </li>
            ))}
        </ul>
    )
}
