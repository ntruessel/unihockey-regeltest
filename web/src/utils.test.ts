import { arrayEquals, fib, random } from './utils';

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
