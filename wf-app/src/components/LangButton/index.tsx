import * as React from 'react'
import Flag from 'react-world-flags'
import { useTranslation } from '../../i18n'
import { useFlagCode } from '../../hooks/useFlagCode'

export interface ILangButtonProps {
    style?: React.CSSProperties
}

export const LangButton: React.FC<ILangButtonProps> = props => {
    const code = useFlagCode('ru')
    const { i18n } = useTranslation()
    const lang = i18n.language
    const onClick = React.useCallback(() => {
        if (lang === 'en') {
            i18n.changeLanguage('ru')
        } else {
            i18n.changeLanguage('en')
        }
    }, [lang])

    return (
        <button style={props.style} onClick={onClick}>
            <style jsx>{`
                button {
                    cursor: pointer;
                    outline: none;
                    border: none;
                    background: none;
                    padding: 0;

                    display: flex;
                    justify-content: center;

                    box-shadow: 0 0 0 2px rgb(0, 83, 108);

                    width: 24px;
                    height: 18px;
                    overflow: hidden;
                }
            `}</style>
            <Flag
                code={code}
                height={18}
            />
        </button>
    )
}

export default LangButton
