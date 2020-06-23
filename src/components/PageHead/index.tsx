import s from './pagehead.module.css'

import { Image } from './Image'

export interface IPageHeadProps {
    title: string
    caption?: string
    image: string
}

export const PageHead: React.FC<IPageHeadProps> = props => {
    return (
        <section className={s.container}>
            <Image
                src={props.image}
                alt={''}
            />

            <div className={s.overlay}>
                <h1 className={s.title}>
                    {props.title}
                </h1>

                {!props.caption ? null : (
                    <div className={s.block}>
                        <p className={s.caption}>
                            {props.caption}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
