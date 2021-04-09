import s from './person.module.css'

import { memo } from 'react'
import cx from 'classnames'
import { Columns } from '@/ui/Columns'

export type PersonProps = {
    style?: React.CSSProperties
    shape: string
    src: string
}

export const Person: React.FC<PersonProps> = memo(({ shape = 'default', ...props }) => (
    <Columns layout={'1fr 3fr'} style={props.style}>
        <div>
            <div className={cx(s.image, s[`shape_${shape}`])}>
                <img
                    src={props.src}
                />
            </div>
        </div>

        <div>
            {props.children}
        </div>
    </Columns>
))
