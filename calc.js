var addBtn = document.getElementById("+");
var subBtn = document.getElementById("-");
var multBtn = document.getElementById("*");
var divBtn = document.getElementById("/");
var equalBtn = document.getElementById("equal");
var dotBtn = document.getElementById("dot");
var a, b;

var calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};
function updateDisplay() {
    var display = document.getElementById("calcDisplay");
    display.value = calculator.displayValue;
}
updateDisplay();

var keys = document.getElementById("container");
keys.addEventListener("click", (event) => {
    var { target } = event;
    if (!target.matches("button")) {
        return;
    }
    if(target.classList.contains("operator")) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if(target.classList.contains("dot")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if(target.classList.contains("clear")) {
        reset();
        updateDisplay();
        return;
    }
    inputDigit(target.value)
    updateDisplay();
});

// function add(a, b) {
//     // var x = 0;
//     // for (var i=0; i<arguments.length; i++) {
//     //     x+=arguments[i];
//     // }
//     // return x;
//     var c = a + b;
//     return c;
// }
// function subtract(a, b) {
//     var c = a - b;
//     return c;
// }
// function multiply(a, b) {
//     var c = a * b;
//     return c;
// }
// function divide(a, b) {
//     var c = a / b;
//     return c;
// }


// addBtn.onclick = function(a,b) {
//     return add(a,b);
// }
// subBtn.onclick = function(a,b) {
//     return subtract(a,b);
// }
// divBtn.onclick = function(a,b) {
//     return divide(a,b);
// }
// multBtn.onclick = function(a,b) {
//     return multiply(a,b);
// }
// // equalBtn.onclick = function() {

// // }
function inputDigit(digit) {
    var { displayValue, waitingForSecondOperand } = calculator;
    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
    calculator.displayValue = displayValue === "0" ? digit:displayValue + digit;
}
console.table(calculator);
}
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;

    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
}}
function handleOperator(nextOperator) {
    var { firstOperand, displayValue, operator } = calculator;
    var inputValue = parseFloat(displayValue);

    if(firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        var result = performCalculation[operator](firstOperand, inputValue);
        
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }else if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.table(calculator);
        return;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.table(calculator);
}

var performCalculation = { //object of functions!! when i 
    //want a bunch of functions inside 1
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand
};


function reset() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
};
