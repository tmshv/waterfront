import React from 'react'

const year = () => (new Date()).getFullYear()
const Footer = (props) => (
    <div>
        <style jsx>{`
            div {
                display: flex;
                justify-content: space-between;
                margin: 0 25px;
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
            waterfront.tool
            <span>/</span>
            {year()}
        </section>
        <section>
            contacts
                </section>
    </div>
)

export default Footer