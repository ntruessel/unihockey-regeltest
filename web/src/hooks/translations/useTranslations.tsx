import { useParams } from 'react-router-dom';

interface Translations {
    de: Messages,
    fr: Messages,
    it: Messages,
}

interface Messages {
    title: string,
    next: string,
}

const messages: Translations = {
    de: {
        title: 'Unihockey Regeltest',
        next: 'Weiter',
    },
    fr: {
        title: 'Test des règles',
        next: 'Suivant',
    },
    it: {
        title: 'Test delle regole',
        next: 'Avanti',
    },
};

export function useTranslations(): ((key: keyof Messages) => string) {
    const { lang } = useParams<{ lang: string }>();
    switch (lang) {
        case 'de':
        case 'fr':
        case 'it':
            return (key: keyof Messages) => messages[lang as keyof Translations][key];
        default:
            console.warn(`Unknown language ${lang}`);
            return (key: keyof Messages) => `{${key}}`;
    }
}
