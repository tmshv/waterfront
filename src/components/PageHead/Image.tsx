import * as React from 'react'
import { useImage } from 'src/hooks/useImage'
import { imageSize } from 'src/app/const'

export interface IImageProps {
    src: string
    alt: string
}

export const Image: React.FC<IImageProps> = props => {
    const src = useImage(props.src, imageSize)

    return (
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
                src={src}
                alt={props.alt}
            />
        </div>
    )
}
