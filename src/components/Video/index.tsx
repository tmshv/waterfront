import s from './video.module.css'

export type VideoProps = {
    src: string
}

export const Video: React.FC<VideoProps> = props => {
    return (
        <div className={s.video}>
            <iframe
                // width="560"
                // height="315"
                src={props.src}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                // allowFullscreen{true}
            />
        </div>
    )
}