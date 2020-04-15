import styles from './styles.module.css'

export interface IImageBlockProps {
    style?: React.CSSProperties
    imageStyle?: React.CSSProperties
    src?: string
}

export const ImageBlock: React.FC<IImageBlockProps> = props => (
    <div
        className={styles.block}
        style={props.style}
    >
        <img
            className={styles.image}
            style={props.imageStyle}
            src={props.src}
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
