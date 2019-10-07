import * as React from 'react'
import { Image } from './Image'

export interface IPageHeadProps {
    title: string
    caption?: string
    image: string | number
}

export const PageHead: React.FC<IPageHeadProps> = props => {
    const imageSrc = props.image.toString()

    return (
        <section>
            <style jsx>{`
                section {
                    position: relative;
                    width: 100%;
                    height: calc(100vh - 60px);
                    min-height: 300px;
                }

                .overlay {
                    position: absolute;
                    width: 70%;
                    bottom: 100px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                }

                .caption {
                    position: relative;
                    margin-left: 15px;
                    padding: 15px;
                    width: 50%;
                    min-width: 300px;
                }

                .caption-text {
                    position: relative;

                    color: white;
                    text-shadow: 0px 0px 1px #666;
                    z-index: 1;
                }

                .caption-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    right: 0;

                    background-color: rgb(90, 200, 240);
                    mix-blend-mode: hard-light;
                }

                h1 {
                    color: white;
                    font-size: 5em;
                    padding: 0 10px;
                    margin: 0;

                    text-shadow: 2px 2px 0px black;
                }

                @media screen and (max-width: 31.25em) {
                    h1 {
                        font-size: 3em;
                    }
                }
            `}</style>

            <Image
                src={imageSrc}
                alt={''}
            />

            <div className={'overlay'}>
                <h1>
                    {props.title}
                </h1>

                {!props.caption ? null : (
                    <div className={'caption'}>
                        <div className={'caption-overlay'} />
                        <p className={'caption-text'}
                            dangerouslySetInnerHTML={{ __html: props.caption }}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
