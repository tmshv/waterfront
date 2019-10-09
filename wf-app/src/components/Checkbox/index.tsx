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
            }
        `}</style>

        <input
            type={'checkbox'}
            checked={props.checked}
            onChange={props.onChange}
        />

        {props.label}
    </label>
)
