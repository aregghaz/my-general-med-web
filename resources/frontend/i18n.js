import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources
    from "@kirschbaum-development/laravel-translations-loader!@kirschbaum-development/laravel-translations-loader";
import LanguageDetector from "i18next-browser-languagedetector";

const options = {
    // order and from where user language should be detected
    order: ["querystring", "cookie", "localStorage", "htmlTag", "navigator", "path", "subdomain"],

    // keys or params to lookup language from
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ["localStorage", "cookie"],
    excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: "myDomain",

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // only detect languages that are in the whitelist
    checkWhitelist: true
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        resources,
        lng: "hy",
        detection: options,
        defaultNS: "site",
        fallbackLng: ["hy", "en", "ru"],
        namespaces: ["site", "admin"],
        keySeparator: false,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })
    .catch(error => {
        throw new Error(error);
    });

export default i18n;
