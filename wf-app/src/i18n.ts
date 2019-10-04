import NextI18Next from 'next-i18next'

const instance = new NextI18Next({
    defaultLanguage: 'ru',
    otherLanguages: ['en'],

    // defaultLanguage: 'en',
    // otherLanguages: ['ru']

    defaultNS:	'common',
    browserLanguageDetection: true,
    serverLanguageDetection: true,
    // defaultLanguage	'en'
    // ignoreRoutes['/_next/', '/static/']
    // otherLanguages(required)	[]
    // localeExtension	'json'
    // localePath	'static/locales'
    // localeStructure	'{{lng}}/{{ns}}'
    // localeSubpaths	{}
    // strictMode	true
    // use(for plugins) []
    // customDetectors[]
})

export default instance

export const {
    appWithTranslation,
    withTranslation,
    useTranslation,
    i18n,
} = instance