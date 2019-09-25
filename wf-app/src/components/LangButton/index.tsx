import * as React from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import { useTranslation } from 'react-i18next'

const LangButton: React.FC = props => {
    const [lang, setLang] = useLocalStorage('lang')
    const { i18n } = useTranslation()

    React.useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang)
        }
    }, [lang])

    return (
        <div>
            <button onClick={() => {
                if (lang === 'en') {
                    setLang('ru')
                } else {
                    setLang('en')
                }
            }}>{lang}</button>
        </div>
    )
}

export default LangButton
