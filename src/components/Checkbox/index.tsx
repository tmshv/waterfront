import s from './checkbox.module.css'

export interface ICheckboxProps {
    checked: boolean
    label: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<ICheckboxProps> = props => (
    <label className={s.checkbox}>
        <input
            type={'checkbox'}
            checked={props.checked}
            onChange={props.onChange}
        />

        <span />

        {props.label}
    </label>
)
