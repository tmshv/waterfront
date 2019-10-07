import * as React from 'react'

import { IPerson } from '../../app/types'

export interface IPersonProps {
    style?: React.CSSProperties
    item: IPerson
}

export const Person: React.FC<IPersonProps> = React.memo(props => (
    <div
        style={props.style}
        className={'person'}
    >
        <style jsx>{`
            .person {
                display: flex;
            }

            .preview {
                flex: 1;
            }

            .content {
                flex: 3;

                padding-left: 10px;
            }

            strong {
                font-size: 1.5em;
            }

            .image {
                max-width: 150px;
                min-width: 100px;
                width: 100%;
            }

            img {
                display: block;
                width: 100%;
            }
        `}</style>

        <div className={'preview'}>
            <div className={'image'}>
                <img
                    src={props.item.previewImage}
                />
            </div>
        </div>

        <div className={'content'}>
            <strong>{props.item.name}</strong>

            <div
                dangerouslySetInnerHTML={{ __html: props.item.content }}
            />
        </div>
    </div>
))
