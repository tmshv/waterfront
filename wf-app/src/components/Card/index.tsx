import * as React from 'react'
import Link from 'next/link'
import { Tag } from '../Tag'
import { ImageBlock } from '../ImageBlock'
import { useImage } from 'src/hooks/useImage'

export interface ICardProps {
    style?: React.CSSProperties

    href: string
    title: string
    body: string
    previewImage: string | number
    tags: string[]
}

export const Card: React.FC<ICardProps> = props => {
    const src = useImage(props.previewImage)

    return (
        <div
            style={props.style}
        >
            <style jsx>{`
                div {
                    box-sizing: border-box;

                    background-color: var(--background-color);
                }

                div {
                    line-height: 1.5em;
                    
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                h2 {
                    padding: 0 10px;
                    color: rgb(90, 200, 240);

                    margin: 0.5em 0;
                }
                    
                a {
                    display: block;
                    text-decoration: none;
                    color: black;

                    position: relative;
                }

                a:hover {
                    color: rgb(0, 83, 108);
                }

                a:hover h2 {
                    color: rgb(0, 83, 108);
                }
            `}</style>

            <Link
                href={props.href}
            >
                <a>
                    <ImageBlock src={src}>
                        {props.tags.map(x => (
                            <Tag key={x}>
                                {x}
                            </Tag>
                        ))}
                    </ImageBlock>

                    <h2>
                        {props.title}
                    </h2>

                    <div
                        dangerouslySetInnerHTML={{ __html: props.body }}
                    />
                </a>
            </Link>
        </div>
    )
}
