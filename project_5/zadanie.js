// ZADANIE

// Zaproponuj uporządkowanie tego kodu zgodnie z paradygmatem programowania obiektowego.
// Skomentuj odpowiednie części kodu.
// Zaproponuj testy jednostkowe. 

class NumberCollection{
    numbers = []
    constructor(numbers){
        this.numbers = numbers
    }

    filterEvenNumbers(){
        return this.numbers.filter(n => n % 2 === 0);
    }

    filterOddNumbers() {
        return this.numbers.filter(n => n % 2 !== 0);
    }
    
    findMax() {
        return Math.max(...this.numbers);
    }
    
    findMin() {
        return Math.min(...this.numbers);
    }
    
    sumNumbers() {
        return this.numbers.reduce((a, b) => a + b, 0);
    }
    
    averageNumbers() {
        return this.sumNumbers(this.numbers) / this.numbers.length;
    }
}


class DateHandler{
    constructor(date){
        this.date = date
    }
    formatDate() {
        return this.date.toISOString().split('T')[0];
    }
    daysBetween(otherDate) {
        return Math.abs(otherDate - this.date) / (1000 * 60 * 60 * 24);
    }
    
    isWeekend() {
        return this.date.getDay() === 0 || this.date.getDay() === 6;
    }

    addDays(days) {
        const result = new Date(this.date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
}

export {NumberCollection, DateHandler}