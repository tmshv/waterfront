import * as React from 'react'

export interface ICheckboxProps {
    checked: boolean
    label: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<ICheckboxProps> = props => (
    <label>
        <style jsx>{`
                label {
                    flex; 1;
                    cursor: pointer;

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
                    position: absolute;
                    margin-top: 3px;
                    margin-left: -1.0em;
                    width: 10px;
                    height: 10px;
                    overflow: hidden;
                    background-color: white;
                }
            `}</style>

        <input
            type={'checkbox'}
            checked={props.checked}
            onChange={props.onChange}
        />

        <span />

        {props.label}
    </label>
)
