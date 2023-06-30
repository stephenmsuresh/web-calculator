const inputScreen = document.querySelector('#screen-row-2');
const outputScreen = document.querySelector('#screen-row-1');
const numbers = document.querySelectorAll('.number');
let operator = '';

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        addNumber(e);
    });
})

function addNumber(evt) {
    if ((inputScreen.textContent) == "0") {
        inputScreen.textContent = "";
    }
    if (inputScreen.textContent.length < 20) {
        inputScreen.textContent += evt.target.innerText;
    }
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', (evt) => {
    inputScreen.textContent = "";
    outputScreen.textContent = "";
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

