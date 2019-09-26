import * as React from 'react'
import { useTranslation } from '../../i18n'

const LangButton: React.FC = props => {
    const { i18n } = useTranslation()
    const lang = i18n.language

    return (
        <div>
            <button onClick={() => {
                if (lang === 'en') {
                    i18n.changeLanguage('ru')
                } else {
                    i18n.changeLanguage('en')
                }
            }}>{lang}</button>
        </div>
    )
}

export default LangButton
