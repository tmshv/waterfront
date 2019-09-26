import NextI18Next from 'next-i18next'

const instance = new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['ru']
})

export default instance

export const {
    appWithTranslation,
    withTranslation,
    useTranslation,
} = instance