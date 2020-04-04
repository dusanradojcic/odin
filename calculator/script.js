"use strict"

//Basic math func
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

//Getting dom elements
const buttons = Array.from(document.querySelectorAll('#buttons button'));
const display = document.querySelector('#display p');

//Add eventlisteners to buttons
buttons.forEach(button => button.addEventListener('click', displayNumbers));

//Complete logic behind calc
function displayNumbers() {
    //To be sure that only one button can have the class of is depressed
    buttons.forEach(button => button.classList.remove('is-depressed'));

    const value = this.value;
    const action = this.dataset.action;
    const displayedNum = display.textContent;
    var previousKeyType = display.dataset.previousKeyType;

    //If numbered buttons are selected
    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = value;
            display.dataset.previousKeyType = '';
        } else {
            display.textContent = displayedNum + value;
        }
    }

    if (action === 'plus' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide') {

        const firstValue = display.dataset.firstValue;
        const operator = display.dataset.operator;
        const secondValue = displayedNum;

        //To calculate with multiple numbers and operators in a row, without usign equals
        if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            display.textContent = calculate(firstValue, operator, secondValue);
            display.dataset.firstValue = display.textContent;
        } else {
            display.dataset.firstValue = displayedNum;
        }
        this.classList.add('is-depressed');
        display.dataset.previousKeyType = 'operator'
        display.dataset.operator = action;
    }

    if (action === 'dot') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
        } else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            display.textContent = '0.';
        }

        display.dataset.previousKeyType = 'decimal';
    }

    if (action === 'c') {
        display.textContent = '0';
        display.dataset.firstValue = '';
        display.dataset.operator = '';
        display.dataset.previousKeyType = '';
    }

    if (action === 'ce') {
        display.textContent = '0';
    }

    if (action === 'del') {
        if (displayedNum.length <= 1) {
            display.textContent = 0;
        } else {
            display.textContent = displayedNum.slice(0, displayedNum.length - 1);
        }
    }

    if (action === 'equals') {
        let firstValue = display.dataset.firstValue;
        const operator = display.dataset.operator;
        let secondValue = displayedNum;
        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
                secondValue = display.dataset.modValue
            }
            display.textContent = calculate(firstValue, operator, secondValue);
        }
        display.dataset.modValue = secondValue;
        display.dataset.previousKeyType = 'calculate';
    }

}

function calculate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    var result = 0;
    switch (operator) {
        case 'plus':
            result = sum(a, b);
            break;
        case 'minus':
            result = minus(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            result = divide(a, b);
            break;
        default:
            result = 'error';
            break;
    }
    return result.toFixed(2);
}