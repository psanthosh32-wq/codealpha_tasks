let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousNumber = currentNumber;
    currentNumber = "";

    previousDisplay.textContent =
        previousNumber + " " + displayOperator(operator);

    updateDisplay();
}

function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    let firstNumber = parseFloat(previousNumber);
    let secondNumber = parseFloat(currentNumber);
    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = "";
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;
    }

    currentNumber = String(
        Math.round((result + Number.EPSILON) * 100000000) / 100000000
    );

    previousNumber = "";
    operator = "";
    previousDisplay.textContent = "";

    updateDisplay();
}

function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    previousDisplay.textContent = "";
    currentDisplay.textContent = "0";
}

function deleteNumber() {

    if (currentNumber === "Error") {
        clearDisplay();
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";
}

function displayOperator(op) {

    switch (op) {

        case "*":
            return "×";

        case "/":
            return "÷";

        case "-":
            return "−";

        default:
            return op;
    }
}

/* Keyboard Support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});