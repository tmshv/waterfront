import s from './person.module.css'

import { IPerson } from '@/app/types'
import { memo } from 'react'
import cx from 'classnames'

export interface IPersonProps {
    style?: React.CSSProperties
    item: IPerson
    shape: string
}

export const Person: React.FC<IPersonProps> = memo(props => (
    <div
        style={props.style}
        className={s.person}
    >
        <div className={s.preview}>
            <div className={cx(s.image, s[`shape_${props.shape}`])}>
                <img
                    src={props.item.previewImage}
                />
            </div>
        </div>

        <div className={s.content}>
            <strong>{props.item.name}</strong>

            <div
                dangerouslySetInnerHTML={{ __html: props.item.content }}
            />

            {props.children}
        </div>
    </div>
))
