//todo: 
//add keyboard support
//js30 video on drumkit

//future improvements:
//exponent button

const MAX_OUTPUT_LENGTH = 15;

const inputScreen = document.querySelector('#input-screen');
const outputScreen = document.querySelector('#output-screen');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
let operator = '';

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        inputNumber(e);
    });
})

operators.forEach((operator) => {
    operator.addEventListener('click', (evt) => {
        handleOperator(evt);
    })
})

document.querySelector('#equals').addEventListener('click', (evt) => {
    if (operator != '') {
        calculate();
    }
    else if ((inputScreen.innerText) != "0") {
        outputScreen.textContent = formatOutput(inputScreen.textContent);
        inputScreen.innerText = "0";
    }
})

function inputNumber(evt) {
    //if inputScreen is 'empty' ie showing 0 at the start like a calculator
    if ((inputScreen.textContent) == "0") {
        inputScreen.textContent = "";
    }
    if (outputScreen.textContent.length > 0 && operator === '') {
        outputScreen.textContent = "";
    }
    if (inputScreen.textContent.length < 20) {
        let num = (evt.type === 'click' ? (evt.target.innerText) : (evt.key))
        inputScreen.textContent += num;
    }
}

function handleOperator(evt) {
    if (operator != '') {
        calculate(operator);
    }
    else if (outputScreen.textContent === "") {
        outputScreen.textContent = formatOutput(inputScreen.textContent);
    }
    // else {
    // }
    operator = ((evt.type === 'click') ? evt.target.id : convertOperator(evt.key));
    inputScreen.textContent = "0";
}

function calculate() {
    let result;
    switch (operator) {
        case "divide":
            result = ((+outputScreen.textContent) / (+inputScreen.textContent));
            break;
        case "multiply":
            result = ((+outputScreen.textContent) * (+inputScreen.textContent));
            break;
        case "subtract":
            result = ((+outputScreen.textContent) - (+inputScreen.textContent));
            break;
        case "add":
            result = ((+outputScreen.textContent) + (+inputScreen.textContent));
            break;
        default:
            result = +(inputScreen.textContent);
    }
    if (result === NaN || !isFinite(result)) {
        outputScreen.textContent = "ERROR";
    }
    else {
        outputScreen.textContent = formatOutput(result);
    }
    // (result === NaN) ? (outputScreen.textContent = result) : (outputScreen.textContent = "ERROR");
    inputScreen.textContent = "0";
    operator = "";
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', (evt) => {
    inputScreen.textContent = "0";
    outputScreen.textContent = "";
    operator = "";
})

const decimal = document.querySelector('#dot');
decimal.addEventListener('click', (evt) => {
    decimalPoint();
})

function decimalPoint() {
    //< 19 so it's not the last char added
    if (!(inputScreen.textContent.includes('.')) && inputScreen.textContent.length < 19) {
        if (inputScreen.textContent.length === 0) {
            inputScreen.textContent += "0";
        }
        inputScreen.textContent += '.';
    }
}

document.querySelector('#backspace').addEventListener('click', (evt) => {
    backspace();
})

function backspace() {
    if (inputScreen.textContent != "0") {
        inputScreen.textContent = inputScreen.textContent.slice(0, -1);
        if (inputScreen.textContent.length === 0) {
            inputScreen.textContent = "0";
        }
    }
}

function formatOutput(output) {
    let num = output.toString();
    if (num.length > MAX_OUTPUT_LENGTH) {
        num = (exponent(output).toString());
        while (num.length > MAX_OUTPUT_LENGTH) {
            num = num.slice(0, (num.indexOf('e') - 1)) + num.slice(num.indexOf('e'))
        }
    }
    return num;
}

function exponent(x, f) {
    return Number.parseFloat(x).toExponential(f);
}

//keyboard support
window.addEventListener('keydown', (evt) => {
    if (isNumber(evt.key)) {
        inputNumber(evt);
    }
    if (isOperator(evt.key)) {
        handleOperator(evt);
    }
    if (isEnter(evt.key)) {
        calculate();
    }
    if (evt.key === '.') {
        decimal();
    }
    if (evt.key === 'Backspace') {
        backspace();
    }
});

function isNumber(num) {
    // return (parseInt(num) == NaN);
    return (!(isNaN(parseInt(num))));
}

function isOperator(op) {
    return (op === '+' ||
        op === '-' ||
        op === '/' ||
        op === '*');
}
function isEnter(keyPress) {
    return (keyPress === "Enter");
}

function convertOperator(op) {
    switch (op) {
        case '+':
            return "add";
        case '-':
            return "subtract";
        case '/':
            return "divide";
        case '*':
            return "multiply";
    }
}