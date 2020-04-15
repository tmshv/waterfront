import styles from './styles.module.css'

import { Image } from './Image'

export interface IPageHeadProps {
    title: string
    caption?: string
    image: string | number
}

export const PageHead: React.FC<IPageHeadProps> = props => {
    const imageSrc = props.image.toString()

    return (
        <section className={styles.container}>
            <Image
                src={imageSrc}
                alt={''}
            />

            <div className={styles.overlay}>
                <h1 className={styles.title}>
                    {props.title}
                </h1>

                {!props.caption ? null : (
                    <div className={styles.block}>
                        <p className={styles.caption}>
                            {props.caption}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
