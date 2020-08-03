import React, { useState } from 'react';
import { Question } from '../components/Question';
import { availableQuestions, fib, randomElement, toQuestion } from '../utils';
import questions from '../questions.json';
import moment from 'moment';


export interface State {
    repetitions: number,
    lockedUntil: string,
}

const initialProgress: State[] = JSON.parse(localStorage.getItem('progress') ?? '[]');

export const Practice: React.FC = () => {
    const [progress, setProgress] = useState(initialProgress);
    const questionIndex = randomElement(availableQuestions(progress));
    return <QuestionView question={toQuestion(questions[questionIndex])}
                         onAnswer={wasCorrect => {
                             const updatedProgress = [...progress];
                             if (!wasCorrect) {
                                 delete updatedProgress[questionIndex];
                             } else {
                                 const repetitions = progress[questionIndex]?.repetitions ?? 1;
                                 const lockedUntil = moment();
                                 lockedUntil.add(10 * fib(repetitions), 'minutes');
                                 updatedProgress[questionIndex] = {
                                     repetitions: repetitions,
                                     lockedUntil: lockedUntil.format(),
                                 };
                             }
                             localStorage.setItem('progress', JSON.stringify(updatedProgress));
                             setProgress(updatedProgress);
                         }}/>;
};

const QuestionView: React.FC<{ question: Question, onAnswer: (wasCorrect: boolean) => void }> = props => {
    const [selected, setSelected] = useState([false, false, false]);
    const [review, setReview] = useState(false);
    return <Question selected={selected}
                     invert={index => {
                         const clone = [...selected];
                         clone[index] = !clone[index];
                         setSelected(clone);
                     }}
                     review={review}
                     evaluate={() => setReview(true)}
                     continue={wasCorrect => {
                         props.onAnswer(wasCorrect);
                         setReview(false);
                         setSelected([false, false, false]);
                     }}
                     question={props.question}/>;
};
