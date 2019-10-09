import React from 'react'
import { Social } from '../Social'
import { social } from '../../app/const'

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
                align-items: center;
            }

            span {
                padding: 0 10px;
            }

            @media screen and (max-width: 31.25em) {
                div {
                    margin: 0 10px;
                }
            }
        `}</style>

        <section>
            waterfront.tools
            <span>/</span>
            {year()}
        </section>
        <section>
            <Social
                color={'white'}
                iconSize={1}
                items={social}
                layout={'horizontal'}
            />
        </section>
    </div>
)

export default Footer