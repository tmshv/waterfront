import styles from './styles.module.css'

interface IProps {
    text: string
}

export const Short: React.FC<IProps> = props => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: props.text }}
            className={styles.short}
            style={{
                lineHeight: 1.5,
            }}
        />
    )
}
