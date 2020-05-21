import styles from './styles.module.css'

import Link from 'next/link'
import { Tag } from '../Tag'
import { ImageBlock } from '../ImageBlock'
import { useImage } from 'src/hooks/useImage'
import { previewImageSize } from 'src/app/const'

export interface ICardProps {
    style?: React.CSSProperties

    href: string
    title: string
    previewImage: string
    tags: string[]
}

export const Card: React.FC<ICardProps> = props => {
    const src = useImage(props.previewImage, previewImageSize)

    return (
        <section
            className={styles.card}
            style={props.style}
        >
            <Link
                href={props.href}
            >
                <a className={styles.link}>
                    <ImageBlock src={src}>
                        {props.tags.map(x => (
                            <Tag key={x}>
                                {x}
                            </Tag>
                        ))}
                    </ImageBlock>

                    <div className={styles.body}>
                        <h2>
                            {props.title}
                        </h2>

                        {props.children}
                    </div>
                </a>
            </Link>
        </section>
    )
}
