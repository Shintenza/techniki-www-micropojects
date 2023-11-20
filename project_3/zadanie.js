// ZADANIE

// Zaproponuj uporządkowanie tego kodu zgodnie z paradygmatem programowania obiektowego.
// Skomentuj odpowiednie części kodu.
// Zaproponuj testy jednostkowe. 




function filterEvenNumbers(numbers) {
    return numbers.filter(n => n % 2 === 0);
}

function filterOddNumbers(numbers) {
    return numbers.filter(n => n % 2 !== 0);
}

function findMax(numbers) {
    return Math.max(...numbers);
}

function findMin(numbers) {
    return Math.min(...numbers);
}

function sumNumbers(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

function averageNumbers(numbers) {
    return sumNumbers(numbers) / numbers.length;
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function daysBetween(date1, date2) {
    return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
}

function isWeekend(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
