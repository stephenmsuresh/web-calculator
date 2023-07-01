//to do: format output
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
        calculate(operator);
    }
    else if ((inputScreen.innerText) != "0") {
        outputScreen.textContent = formatOutput(inputScreen.textContent);
        inputScreen.innerText = "0";
    }
})

function inputNumber(evt) {
    if ((inputScreen.textContent) == "0") {
        inputScreen.textContent = "";
    }
    if (outputScreen.textContent.length > 0 && operator === '') {
        outputScreen.textContent = "";
    }
    if (inputScreen.textContent.length < 20) {
        inputScreen.textContent += evt.target.innerText;
    }
}

function handleOperator(evt) {
    if (operator != '') {
        calculate(operator);
    }
    else if (outputScreen.textContent === "") {
        outputScreen.textContent = formatOutput(inputScreen.textContent);
    }
    else {

    }
    operator = evt.target.id;
    inputScreen.textContent = "0";
}

function calculate(mathOperation) {
    let result;
    switch (mathOperation) {
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
    if (inputScreen.textContent != "0") {
        inputScreen.textContent = inputScreen.textContent.slice(0, -1);
        if (inputScreen.textContent.length === 0) {
            inputScreen.textContent = "0";
        }
    }
})

function formatOutput(output) {
    let num = output.toString();
    console.log(num);
    console.log(num.length)
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