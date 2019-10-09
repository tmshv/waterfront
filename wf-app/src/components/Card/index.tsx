import * as React from 'react'
import Link from 'next/link'
import { Tag } from '../Tag'
import { ImageBlock } from '../ArticleCard/ImageBlock'
import { getImageUrl } from '../../app/api'

function useImage(param: string | number): string | undefined {
    const [src, setSrc] = React.useState<string>()

    React.useEffect(() => {
        if (!param) {
            return
        } else if (typeof param === 'string') {
            setSrc(param)
        } else {
            (async () => {
                const image = await getImageUrl(param)
                setSrc(image)
            })()
        }
    }, [param])

    return src
}

const Img: React.FC<{ param: string | number }> = props => {
    const src = useImage(props.param)

    if (!src) {
        return null
    }

    return (
        <ImageBlock src={src}>
            {props.children}
        </ImageBlock>
    )
}

export interface ICardProps {
    style?: React.CSSProperties

    href: string
    title: string
    body: string
    previewImage: string | number
    tags: string[]
}

export const Card: React.FC<ICardProps> = props => {
    return (
        <div
            style={props.style}
        >
            <style jsx>{`
                div {
                    box-sizing: border-box;
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
                    <Img param={props.previewImage}>
                        {props.tags.map(x => (
                            <Tag key={x}>
                                {x}
                            </Tag>
                        ))}
                    </Img>

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
