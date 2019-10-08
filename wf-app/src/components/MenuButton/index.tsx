import * as React from 'react'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'

export interface IMenuButtonProps {
    style?: React.CSSProperties
    onClick: () => void
}

export const MenuButton: React.FC<IMenuButtonProps> = props => {
    return (
        <button style={props.style} onClick={props.onClick}>
            <style jsx>{`
                button {
                    cursor: pointer;
                    outline: none;
                    border: none;
                    background: none;
                    padding: 0;

                    display: flex;
                    align-items: center;
                    //justify-content: center;

                    //width: 24px;
                    //height: 18px;
                    //overflow: hidden;
                }
            `}</style>

            <Icon
                path={mdiMenu}
                size={1}
                color={'rgb(0, 83, 108)'}
            />
        </button>
    )
}
