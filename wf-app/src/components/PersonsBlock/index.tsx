import * as React from 'react'

import { Person } from './Person'
import { IPerson } from '../../app/types'
import { useTranslation } from '../../i18n'

interface IPersonsBlockProps {
    title: string
    items: IPerson[]
}

export const PersonsBlock: React.FC<IPersonsBlockProps> = props => {
    const { t } = useTranslation()

    return (
        <div>
            <style jsx>{`
                div {
                    padding: 0 15px;
                }

                h2 {
                    font-size: 2em;
                }
            `}</style>

            <h2>{t(props.title)}</h2>

            {props.items.map((x, i) => (
                <Person
                    key={i}
                    item={x}
                    style={{
                        marginBottom: 50,
                    }}
                />
            ))}
        </div>
    )
}
