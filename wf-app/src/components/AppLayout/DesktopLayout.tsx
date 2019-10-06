import * as React from 'react'

interface IAppLayoutProps {
    head: React.ReactNode
    back: React.ReactNode
}

export const DesktopLayout: React.FC<IAppLayoutProps> = props => (
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

            .back {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                width: 100%;
                height: 100%;

                z-index: -1;
                pointer-events: auto;
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
        
        <div className={'back'}>
            {props.back}
        </div>

        <div className={'head'}>
            {props.head}
        </div>

        <div className={'body'}>
            {props.children}
        </div>
    </div>
)
