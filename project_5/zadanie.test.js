import { DateHandler, NumberCollection } from "./zadanie.js";

const numbercollection = new NumberCollection([1, 2, 3, 46, 5, 7, 8])

test('tests filter even numbers', () => {
    expect(numbercollection.filterEvenNumbers()).toStrictEqual([2, 46, 8]);
});

test('tests filter odd numbers', () => {
    expect(numbercollection.filterOddNumbers()).toStrictEqual([1, 3, 5, 7]);
});


test('test find max', () => {
    expect(numbercollection.findMax()).toStrictEqual(46);
})

test('test find min', () => {
    expect(numbercollection.findMin()).toStrictEqual(1);
})

test('test sum', () => {
    expect(numbercollection.sumNumbers()).toStrictEqual(72);
})

test('test average', () => {
    expect(numbercollection.averageNumbers()).toBeCloseTo(10.2857, 3);
})

const datehandler = new DateHandler(new Date("2023-11-26"))


test('test formatDate', () => {
    expect(datehandler.formatDate()).toStrictEqual("2023-11-26");
})

test('test daysBetween', () => {
    expect(datehandler.daysBetween(new Date("2023-11-29"))).toStrictEqual(3);
})

test('test isWeekend', () => {
    expect(datehandler.isWeekend()).toStrictEqual(true);
})


test('test addDays', () => {
    expect(datehandler.addDays(3)).toStrictEqual(new Date("2023-11-29"));
})