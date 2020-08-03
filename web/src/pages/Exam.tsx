import React from 'react';
import { useQuestions } from '../hooks/questions/useQuestions';
import { random, toQuestion } from '../utils';
import { Question } from '../components/Question';

export const Exam: React.FC = () => {
    const questions = useQuestions();
    const selectedIndices = new Set<number>();
    while (selectedIndices.size !== 30) {
        selectedIndices.add(random(questions.length));
    }
    return <>
        {Array.from(selectedIndices.values()).map(index =>
            <Question key={index}
                      question={toQuestion(questions[index])}
                      review={false}
                      selected={[false, false, false]}
                      continue={() => {}}
                      evaluate={() => {}}
                      invert={() => {}}
            />,
        )}
    </>;
};
