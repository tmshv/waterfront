import * as React from 'react'

export interface IImageProps {
    src: string
    alt: string
}

export const Image: React.FC<IImageProps> = props => (
    <div>
        <style jsx>{`
            div {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;

                overflow: none;
            }
            
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        `}</style>

        <img
            src={props.src}
            alt={props.alt}
        />
    </div>
)
