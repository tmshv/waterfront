import { useTranslation } from 'src/hooks/useTranslation'
import Link from 'next/link'
import cx from 'classnames'
import { useContext } from 'react'
import { MenuContext } from '@/context/menu'
import { useLanguage } from '@/hooks/useLanguage'
import { changeLangPathSuffix } from '@/lib/lang'

export interface IMenuProps {
    style?: React.CSSProperties
    menuItemIconSize?: number
    menuItemMarginRight?: number
    layout: 'horizontal' | 'vertical'
}

export const Menu: React.FC<IMenuProps> = props => {
    const { t } = useTranslation()
    const lang = useLanguage()
    const items = useContext(MenuContext)

    const xs = items.map(item => ({
        href: changeLangPathSuffix(lang, item.url),
        label: t(item.name),
    }))

    return (
        <ul style={props.style} className={cx(props.layout)}>
            <style jsx>{`
                ul {
                    font-family: var(--font-family-second);
                    font-size: var(--font-size-menu);

                    list-style: none;
                    display: flex;
                    align-items: center;

                    flex-direction: column;

                    margin: 0;
                    padding: 0;
                }

                ul.horizontal {
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                
                a {
                    transition: color var(--transition-link-hover-delay);
                    color: var(--color-text-opposite);

                    text-decoration: none;
                }

                a:hover {
                    color: var(--color-link-hover);
                }

                li {
                    margin-right: 20px;
                }

                li:last-child {
                    margin-right: 0;
                }
            `}</style>

            {xs.map(x => (
                <li
                    key={x.href}
                >
                    <Link
                        href={x.href}
                    >
                        <a>
                            <span>{x.label}</span>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
