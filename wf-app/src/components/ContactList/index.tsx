import React from 'react'
import { Contact } from './Contact'

export interface IContactListProps {
    items: Array<{
        title: string
        tel: string
        email: string
    }>
}

export const ContactList: React.FC<IContactListProps> = props => (
    <ul>
        <style jsx>{`
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            li {
                margin-bottom: 10px;
            }
            
            li:last-child {
                margin-bottom: 0px;
            }
        `}</style>

        {props.items.map(x => (
            <li key={x.tel}>
                <Contact
                    tel={x.tel}
                    email={x.email}
                >
                    {x.title}
                </Contact>
            </li>
        ))}
    </ul>
) 
