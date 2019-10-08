import * as React from 'react'

import { useTranslation } from '../../i18n'
import Link from 'next/link'
import cx from 'classnames'

export interface IMenuItem {
    url: string
    name: string
}

export interface IMenuProps {
    style?: React.CSSProperties
    menuItemIconSize?: number
    menuItemMarginRight?: number
    items: IMenuItem[]
    layout: 'horizontal' | 'vertical'
}

export const Menu: React.FC<IMenuProps> = props => {
    const { t } = useTranslation()

    return (
        <ul style={props.style} className={cx(props.layout)}>
            <style jsx>{`
                ul {
                    list-style: none;
                    display: flex;
                    align-items: center;

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

            {props.items.map(x => (
                <li
                    key={x.url}
                >
                    <Link
                        href={x.url}
                    >
                        <a>
                            <span>{t(x.name)}</span>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
