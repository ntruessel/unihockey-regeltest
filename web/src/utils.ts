import { Question } from './components/Question';
import { State } from './pages/Practice';
import moment from 'moment';

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    const result = [...array];

    while (0 !== currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        const temporaryValue = result[currentIndex];
        result[currentIndex] = result[randomIndex];
        result[randomIndex] = temporaryValue;
    }

    return result;
}

export function random(max: number) {
    return Math.floor(Math.random() * max);
}

export function randomElement<T>(array: T[]): T {
    return array[random(array.length)];
}

export function toQuestion(question: any): Question {
    return {
        title: question.question,
        options: shuffle(question.answers.map((answer: any) => {
            return {
                content: answer.answer,
                justification: answer.justification,
                isCorrect: answer.correct,
            };
        })),
    };
}

export function arrayEquals<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

export function fib(n: number): number {
    let u = 1;
    let v = 1;
    for (let i = 0; i < n; ++i) {
        let cache = v;
        v += u;
        u = cache;
    }
    return u;
}

export function availableQuestions(progress: State[]): number[] {
    const result = [];
    for (let i = 0; i < progress.length; ++i) {
        if (progress[i] === undefined || progress[i] === null || moment(progress[i].lockedUntil).isBefore(moment())) {
            result.push(i);
        }
    }
    return result;
}
