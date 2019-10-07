import * as React from 'react'

import { IPerson } from '../../app/types'

export const Person: React.FC<{ item: IPerson }> = React.memo(props => (
    <div className={'person'}>
        <style jsx>{`
            .person {
                display: flex;

                margin-bottom: 70px;
            }

            .preview {
                flex: 1;
            }

            .content {
                flex: 3;
            }

            .image {
                width: 150px;
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
