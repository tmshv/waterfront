import React from 'react'
import { Contact } from './Contact'
import { ContactList } from './ContactList'

const year = () => (new Date()).getFullYear()
const Footer = (props) => (
    <div>
        <style jsx>{`
            div {
                display: flex;
                justify-content: space-between;
                margin: 0 25px;
            }

            section {
                display: flex;

                margin-bottom: 20px;
            }

            section:last-child {
                margin-bottom: 0px;
            }

            span {
                padding: 0 10px;
            }

            @media screen and (max-width: 31.25em) {
                div {
                    margin: 0 10px;

                    flex-direction: column;
                }
            }
        `}</style>

        <section>
            waterfront.tools
            <span>/</span>
            {year()}
        </section>

        <section>
            <ContactList
                items={[
                    {
                        tel: '+79500237093',
                        email: 'coordinator@streetartinstitute.com',
                        title: 'Полина Климовицкая, координатор проекта',
                    },
                    {
                        tel: '+79817640984',
                        email: 'ozzzzjet@mail.ru',
                        title: 'Вика Григоренко, пресс-секретарь',
                    }
                ]}
            />
        </section>
    </div >
)

export default Footer