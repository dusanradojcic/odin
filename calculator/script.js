function sum(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? NaN : a / b;
}

const buttons = document.querySelectorAll('#buttons button');
const display = document.querySelector('#display p');

console.table(buttons);

buttons.forEach(button => button.addEventListener('click', displayNumbers));

var firstNumber = 0;
var currentNumber = 0;
function displayNumbers() {

    switch (this.value) {
        case '=':
            console.log("Jednako");
            break;
        case 'c':
            console.log('clear');
            break;
        case 'ce':
            console.log('clear');
            break;
        case 'del':
            console.log('del');
            break;
        case '-':
            console.log('minus');
            break;
        case '+':
            firstNumber = currentNumber;
            currentNumber = 0;
            break
        case '*':
            firstNumber = currentNumber;
            currentNumber = 0;
            break;
        case '/':
            firstNumber = currentNumber;
            currentNumber = 0;
            break;
        default:
            currentNumber = currentNumber * 10 + parseInt(this.value);
            display.textContent = currentNumber;
    }
}