import * as React from 'react'

interface IAppLayoutProps {
    head: React.ReactNode
}

export const AppLayout:React.FC<IAppLayoutProps> = props => (
    <div className={'content'}>
        <style jsx>{`
            .content {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                pointer-events: none;
            }

            .head {
                pointer-events: auto;
            }

            .body {
                width: 35%;
                min-width: 300px;
                max-width: 350px;

                pointer-events: auto;
            }
        `}</style>

        <div className={'head'}>
            {props.head}
        </div>

        <div className={'body'}>
            {props.children}
        </div>
    </div>
)
