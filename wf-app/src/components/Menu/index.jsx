import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Logo from '../Logo'

import Icon from '@mdi/react'
import { mdiFacebookBox, mdiYoutube, mdiVkBox, mdiInstagram } from '@mdi/js'

const target = newTab => newTab ? '_blank' : null

const Menu = (props) => (
    <div>
        <style jsx>{`
            div {
                padding: 0 20px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
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
            href={props.logoUrl}
        >
            <a>
                <Logo
                    width={300}
                />
            </a>
        </Link>

        <section>
            <ul>
                {props.menuItems.map(x => (
                    <li
                        key={x.url}
                        style={{
                            marginRight: x.marginRight
                                ? x.marginRight
                                : props.menuItemMarginRight,
                        }}
                    >
                        <Link
                            href={x.url}
                        >
                            <a
                                target={target(x.newTab)}
                            >
                                {!x.name ? null : (
                                    <span>{x.name}</span>
                                )}

                                {!x.icon ? null : (
                                    <Icon path={x.icon}
                                        size={props.menuItemIconSize}
                                        color={'rgb(0, 83, 108)'}
                                    />
                                )}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>

            <button>En</button>
        </section>
    </div>
)

Menu.propTypes = {
    logoUrl: PropTypes.string,
    menuItemIconSize: PropTypes.number,
    menuItemMarginRight: PropTypes.number,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string.required,
    }))
}

Menu.defaultProps = {
    logoUrl: '/',
    menuItemIconSize: 1.2,
    menuItemMarginRight: 40,
    menuItems: [
        {
            name: 'About',
            url: '/about',
        },
        {
            name: 'Projects',
            url: '/projects',
        },
        {
            name: 'Events',
            url: '/events',
        },

        {
            icon: mdiInstagram,
            url: 'https://www.instagram.com/waterfront.tools',
            newTab: true,
            marginRight: 10,
        },
        {
            icon: mdiYoutube,
            url: 'https://www.youtube.com/playlist?list=PL04bG7e-zbhB_pGj9UGQIgM8G34xo3hqj',
            newTab: true,
            marginRight: 10,
        },
        {
            icon: mdiFacebookBox,
            url: 'https://www.facebook.com/waterfront.tools',
            newTab: true,
            marginRight: 10,
        },
        {
            icon: mdiVkBox,
            url: 'https://vk.com/waterfront2019',
            newTab: true,
            marginRight: 10,
        },
    ]
}

export default Menu