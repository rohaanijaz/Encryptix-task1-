const display = document.querySelector('.display');
let currentInput = '';
let currentOperator = '';
let firstOperand = null;
let secondOperand = null;
let shouldResetDisplay = false;

function resetCalculator() {
    currentInput = '';
    currentOperator = '';
    firstOperand = null;
    secondOperand = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput === '' ? '0' : currentInput;
}

function handleNumberClick(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += number;
    updateDisplay();
}

function handleOperatorClick(operator) {
    if (currentInput === '') return; // Prevent operators without numbers
    if (currentOperator !== '' && secondOperand === null) {
        currentOperator = operator;
        return;
    }
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        currentInput = '';
        currentOperator = operator;
    } else {
        secondOperand = parseFloat(currentInput);
        calculate();
        firstOperand = parseFloat(display.textContent);
        secondOperand = null;
        currentInput = '';
        currentOperator = operator;
    }
    shouldResetDisplay = true;
}

function handleEqualsClick() {
    if (currentOperator === '' || currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        currentInput = '';
    } else if (secondOperand === null) {
        secondOperand = parseFloat(currentInput);
        calculate();
        firstOperand = parseFloat(display.textContent);
        secondOperand = null;
        currentOperator = '';
    }
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === '+') {
        currentInput = (firstOperand + secondOperand).toString();
    } else if (currentOperator === '-') {
        currentInput = (firstOperand - secondOperand).toString();
    } else if (currentOperator === '×') {
        currentInput = (firstOperand * secondOperand).toString();
    } else if (currentOperator === '÷') {
        if (secondOperand === 0) {
            currentInput = 'Error';
        } else {
            currentInput = (firstOperand / secondOperand).toString();
        }
    }
    updateDisplay();
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (!isNaN(buttonText) || buttonText === '.') {
            handleNumberClick(buttonText);
        } else if (buttonText === 'AC') {
            resetCalculator();
        } else if (buttonText === '+/-' && currentInput !== '') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
        } else if (buttonText === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '×' || buttonText === '÷') {
            handleOperatorClick(buttonText);
        } else if (buttonText === '=') {
            handleEqualsClick();
        }
    });
});
