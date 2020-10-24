import de from './de.json';
import fr from './fr.json';
import it from './it.json';
import { useParams } from 'react-router-dom';

interface RawQuestion {
    question: string;
    answers: RawAnswer[];
}

interface RawAnswer {
    answer: string;
    justification: string;
    correct: boolean;
}

export function useQuestions(): RawQuestion[] {
    const { lang } = useParams<{ lang: string }>();
    switch (lang) {
        case 'fr':
            return fr;
        case 'it':
            return it;
        default:
            return de;
    }
}
