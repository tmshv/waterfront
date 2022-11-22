import s from './person.module.css'

import { memo } from 'react'
import { Columns } from '@/ui/Columns'
import Image from 'next/legacy/image'

export type PersonProps = {
    style?: React.CSSProperties
    shape: string
    src: string
}

export const Person: React.FC<PersonProps> = memo(({ shape = 'default', ...props }) => (
    <Columns layout={'1fr 3fr'} style={props.style}>
        <Image
            src={props.src}
            width={1}
            height={1}
            layout={'responsive'}
            className={s[`shape_${shape}`]}
        />

        <div>
            {props.children}
        </div>
    </Columns>
))
