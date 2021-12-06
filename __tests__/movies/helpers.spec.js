import * as helpers from '../../src/scripts/movies/helpers';

describe('On helpers.js', () => {
    describe('On runtimeFormatting', () => {
        it('should receive a number 120 and return string in the format "{d}h {d}m"', () => {
            const runtimeMinute = 120;
            const runtimeHour = helpers.runtimeFormatting(runtimeMinute);
            expect(runtimeHour).toBe('2h 0m');
        });

        it('should receive a number 1 and return string in the format "{d}h {d}m"', () => {
            const runtimeMinute = 1;
            const runtimeHour = helpers.runtimeFormatting(runtimeMinute);
            expect(runtimeHour).toBe('0h 1m');
        });

        it('should receive a number 210 and return string in the format "{d}h {d}m"', () => {
            const runtimeMinute = 210;
            const runtimeHour = helpers.runtimeFormatting(runtimeMinute);
            expect(runtimeHour).toBe('3h 30m');
        });

        it('should return "null" for not number argument', () => {
            expect(helpers.runtimeFormatting('120')).toBe('null');
        });

        it('should return "null" for NaN', () => {
            expect(helpers.runtimeFormatting(NaN)).toBe('null');
        });

        it('should return "null" for Infinity', () => {
            expect(helpers.runtimeFormatting(Infinity)).toBe('null');
        });

        it('should return "null" for number less than 1', () => {
            expect(helpers.runtimeFormatting(0)).toBe('null');
        });
    });

    describe('On rateFormatting', () => {
        it('should return "NR" for rate is null', () => {
            expect(helpers.rateFormatting(null)).toBe('NR');
        });

        it('should return "NR" for rate is undefined', () => {
            expect(helpers.rateFormatting(undefined)).toBe('NR');
        });

        it('should return "NR" for rate is false', () => {
            expect(helpers.rateFormatting(false)).toBe('NR');
        });

        it('should return "NR" for rate is 0', () => {
            expect(helpers.rateFormatting(0)).toBe('NR');
        });

        it('should return rate for rate is "0"', () => {
            expect(helpers.rateFormatting('0')).toBe('0');
        });
    });

    describe('On rateState', () => {
        it('should return string "bad-rate" for rate is null', () => {
            expect(helpers.rateState(null)).toBe('bad-rate');
        });

        it('should return string "bad-rate" for rate is NaN', () => {
            expect(helpers.rateState(NaN)).toBe('bad-rate');
        });

        it('should return string "bad-rate" for rate is Infinity', () => {
            expect(helpers.rateState(Infinity)).toBe('bad-rate');
        });

        it('should return string "bad-rate" for rate is less than 7', () => {
            const randomNumber = Math.floor(Math.random() * 7);
            expect(helpers.rateState(randomNumber)).toBe('bad-rate');
        });

        it('should return string "bad-rate" for rate is greater than or equal 7', () => {
            const randomNumber = Math.floor(Math.random() * 10) + 7;
            expect(helpers.rateState(randomNumber)).toBe('good-rate');
        });
    });
});
