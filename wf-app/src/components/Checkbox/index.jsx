import React from 'react'
import PropTypes from 'prop-types'

export default function Checkbox(props) {
    return (
        <label>
            <style jsx>{`
                label {
                    padding-left: 1.0em;
                }

                input {
                    position: absolute;
                    appearance: none;
                }

                input:checked + span {
                    background-color: black;
                    box-shadow: 0 0 0 2px white inset;
                }
                
                input:focus + span {
                    box-shadow: 0 0 0 2px white;
                }

                span {
                    cursor: pointer;

                    position: absolute;
                    margin-top: 3px;
                    margin-left: -1.0em;
                    width: 10px;
                    height: 10px;
                    overflow: hidden;
                    // border-radius: 0.05em;
                    background-color: white;
                    // border: 2px solid black;
                    // background-repeat: no-repeat;
                    // background-position: 50% 50%;
                    // box-shadow: 0 0 0 0.1em #4A90E2;
                }
            `}</style>

            <input
                // className={'checkbox'}
                type={'checkbox'}
                checked={props.checked}
                onChange={props.onChange}
            />

            <span/>

            {props.label}
        </label>
    )
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
}
