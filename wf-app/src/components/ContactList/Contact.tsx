import React from 'react'

export interface IContactProps {
    tel: string
    email: string
}

export const Contact: React.FC<IContactProps> = props => (
    <section>
        <style jsx>{`
            section {
                display: flex;
                flex-direction: column;
            }

            span {
                margin-bottom: 10px;
            }

            .contact {
                display: flex;
                flex-wrap: wrap;
            }

            a {
                padding-right: 20px;
                padding-bottom: 10px;

                color: white;
            }

            a:hover, a:active, a:focus {
                color: rgb(90,200,240);
            }

            a:last-child {
                padding-right: 0px;
            }
        `}</style>

        <span>
            {props.children}
        </span>

        <span className={'contact'}>
            <a href={`tel:${props.tel}`}>
                {props.tel}
            </a>
            <a href={`mailto:${props.email}`}>
                {props.email}
            </a>
        </span>
    </section>
)
