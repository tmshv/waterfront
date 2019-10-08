import * as React from 'react'

import Icon from '@mdi/react'

export interface ISocialLinkProps {
    href: string
    icon: string
    size: number
    color: string
}

export const SocialLink: React.FC<ISocialLinkProps> = props => {
    return (
        <a
            href={props.href}
            target={'_blank'}
        >
            <style jsx>{`
                a {
                    display: flex;
                    align-items: center;

                    color: rgb(0, 83, 108);
                }

                a:hover {
                    color: rgb(20, 120, 130);
                }
            `}</style>

            <Icon path={props.icon}
                size={props.size}
                color={props.color}
            />
        </a>
    )
}
