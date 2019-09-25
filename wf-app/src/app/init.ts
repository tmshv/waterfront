import { initReactI18next } from "react-i18next";
import i18next from "i18next";

type TranslationConf = {
    [name: string]: {
        translation: {
            [name: string]: string,
        }
    },
}

type Config = {
    defaultLang: string
    translation: TranslationConf
}

export function init(config: Config) {
    initI18next(config.defaultLang, config.translation)
}

const initI18next = (lang: string, resources: TranslationConf) => i18next
    .use(initReactI18next)
    .init({
        resources: resources,
        lng: lang,
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
