import styles from './styles.module.css'

import Image from 'next/image'

export interface IImageBlockProps {
    style?: React.CSSProperties
    src?: string
}

export const ImageBlock: React.FC<IImageBlockProps> = props => (
    <div
        className={styles.block}
        style={props.style}
    >
        <Image
            src={props.src!}
            width={3}
            height={4}
            alt={''}
            layout={'responsive'}
            objectFit={'cover'}
        />

        <div className={styles.overlay} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
            <div>
                {props.children}
            </div>
        </div>
    </div>
)
