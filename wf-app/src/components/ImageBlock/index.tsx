export interface IImageBlockProps {
    style?: React.CSSProperties
    src?: string
}

export const ImageBlock: React.FC<IImageBlockProps> = props => (
    <div className={'block'}>
        <style jsx>{`
            .block {
                position: relative;
            }

            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                box-sizing: border-box;
                padding: 10px;
            }

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        `}</style>

        <img
            src={props.src}
        />

        <div className={'overlay'} style={{
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
