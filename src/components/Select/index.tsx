import * as React from 'react'

import ReactSelect from 'react-select'
import { useTranslation } from 'src/hooks/useTranslation'
import { useLanguage } from 'src/hooks/useLanguage'

interface ISelectProps {
    value: string
    options: Array<{ value: string, label: string }>
    onChange: (value: string) => void
}

export const Select: React.FC<ISelectProps> = props => {
    const { t } = useTranslation()
    const lang = useLanguage()

    const options = React.useMemo(
        () => props.options.map(x => ({
            value: x.value,
            label: t(x.label),
        })),
        [props.options, lang],
    )
    const value = React.useMemo(
        () => {
            return options.find(x => x.value === props.value)!
        },
        [props.value, lang, options]
    )

    return (
        <ReactSelect
            // name="color"
            value={value}
            options={options}
            onChange={(value: any) => {
                props.onChange(value.value)
            }}
            theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: 'rgb(90, 200, 240)',
                    primary: 'rgb(0, 83, 108)',
                },
            })}
            styles={{
                container: style => ({
                    ...style,
                    marginBottom: 15,
                }),
                control: style => ({
                    ...style,
                    borderRadius: 0,
                }),
                option: style => ({
                    ...style,
                    color: 'black',
                })
            }}
            // className="basic-single"
            // classNamePrefix="select"
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
        />
    )
}
