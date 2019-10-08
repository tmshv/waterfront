import * as React from 'react'

import dynamic from 'next/dynamic'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'

import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { Social } from '../Social'
import { social, menu } from '../../app/const'

const LangButton = dynamic(() => import('../LangButton'), {
    ssr: false,
})

export interface INavigationProps {
}

export const Navigation: React.FC<INavigationProps> = props => {
    const isMobile = useMobile()

    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    align-items: center;
                }
            `}</style>

            {isMobile ? (
                <Icon path={mdiMenu}
                    size={1}
                    color={'rgb(0, 83, 108)'}
                />
            ) : (
                    <>
                        <Menu
                            layout={'horizontal'}
                            items={menu}
                            style={{
                                marginRight: 20,
                            }}
                        />

                        <Social
                            color={'rgb(0, 83, 108)'}
                            iconSize={1}
                            items={social}
                            layout={'horizontal'}
                            style={{
                                marginRight: 25,
                            }}
                        />

                        <LangButton />
                    </>
                )}
        </div>
    )
}
