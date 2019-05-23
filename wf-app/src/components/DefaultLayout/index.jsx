import React from 'react'
import PropTypes from 'prop-types'

const DefaultLayout = (props) => {
    return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                main {
                }

                header {
                    width: 100%;
                    background-color: white;
                }

                footer {
                    width: 100%;

                    background-color: rgb(0, 83, 108);
                    color: white;

                    padding: 20px 0;
                }
            `}</style>

            <header>
                {props.header}
            </header>
            <main>
                {props.main}
            </main>
            <footer>
                {props.footer}
            </footer>
        </div>
    )
}

DefaultLayout.propTypes = {
    header: PropTypes.any,
    main: PropTypes.any,
    footer: PropTypes.any,
}

export default DefaultLayout