import { arrayEquals, availableQuestions, fib, random } from './utils';
import moment from 'moment';

it('computes the fibonacci sequence', () => {
    expect(fib(0)).toEqual(1);
    expect(fib(1)).toEqual(1);
    expect(fib(2)).toEqual(2);
    expect(fib(3)).toEqual(3);
    expect(fib(4)).toEqual(5);
    expect(fib(5)).toEqual(8);
    expect(fib(10)).toEqual(89);
});

it('compares arrays', () => {
    expect(arrayEquals([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(arrayEquals([1, 2], [1, 2, 3])).toBeFalsy();
});

it('computes random numbers', () => {
    for (let i = 0; i < 100; ++i) {
        const value = random(10);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(10);
    }
});

it('removes blocked questions', () => {
    const progress = new Array(6);
    progress[0] = { repetitions: 1, lockedUntil: moment().add(1, 'hour').format() };
    progress[4] = { repetitions: 1, lockedUntil: moment().add(1, 'hour').format() };
    expect(availableQuestions(progress)).toEqual([1, 2, 3, 5]);
});
