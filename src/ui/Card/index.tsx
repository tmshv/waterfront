import s from './card.module.css'

import Link from 'next/link'
import cx from 'classnames'
import Image from 'next/image'

function parseRatio(value: string | undefined, w: number, h: number): [number, number] {
    if (!value) {
        return [w, h]
    }

    const parts = value.split('/')
    if (parts.length !== 2) {
        return [w, h]
    }

    return [
        parseFloat(parts[0]),
        parseFloat(parts[1]),
    ]
}

export type CardProps = {
    href?: string
    title: string
    src: string
    ratio?: string
    overlay?: React.ReactNode
    style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = props => {
    const active = !!props.href
    const [width, height] = parseRatio(props.ratio, 1, 1)

    const content = (
        <>
            <Image
                src={props.src}
                width={width}
                height={height}
                alt={''}
                layout={'responsive'}
                objectFit={'cover'}
            />

            <div className={s.body}>
                <h2>
                    {props.title}
                </h2>

                {props.children}
            </div>
        </>
    )

    return (
        <section
            className={cx(s.card, {
                [s.active]: active,
            })}
            style={props.style}
        >
            {!props.href ? content : (
                <Link href={props.href}>
                    <a className={s.link}>
                        {content}
                    </a>
                </Link>
            )}
        </section>
    )
}
