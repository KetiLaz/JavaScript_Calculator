const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".all_buttons");

const calculator = {
    displayCalculator: "0",
    firstNumber: null,
    waitForSecondNumber: false,
    operator: null
};

function firstNumber(number){
    if (calculator.waitForSecondNumber === true) {
        calculator.displayCalculator = number;
        calculator.waitForSecondNumber = false;
    }
    // If calculator.displayCalculator is 0 overwrite with number clicked. Otherwise append the number
    else{
        let displayCalculator = calculator.displayCalculator;
        calculator.displayCalculator = displayCalculator === "0" ? number :displayCalculator + number;
    }
}

function updateDisplay() {
    display.textContent = calculator.displayCalculator;
}

function decimal(dot) {
    // Fixes the . bug  
    if (calculator.waitForSecondNumber === true) {
        calculator.displayCalculator = "0.";
        calculator.waitForSecondNumber = false;
        return;
    }
    if(!calculator.displayCalculator.includes(".")){
        calculator.displayCalculator += dot;
    }
}

function backspace() { 
    calculator.displayCalculator = calculator.displayCalculator.slice(0, -1);
    if (calculator.displayCalculator === "") {
        calculator.displayCalculator = "0";
    }
    if (calculator.operator != null && calculator.waitForSecondNumber == true) {
        calculator.firstNumber = parseFloat(calculator.displayCalculator);
    }
    if (calculator.operator != null && calculator.waitForSecondNumber == false 
        && calculator.displayCalculator === "0") {
        calculator.waitForSecondNumber = true;
        calculator.displayCalculator = calculator.firstNumber.toString();
    }
}

function clearAll(){
    calculator.displayCalculator = "0";
    calculator.firstNumber = null;
    calculator.waitForSecondNumber = false;
    calculator.operator = null;
}

function operator(mathSymbol){
    let displayCalculator = calculator.displayCalculator;
    let displayNumber = parseFloat(displayCalculator);

    // Change the operator if user changes mind 
    if (operator && calculator.waitForSecondNumber){
        calculator.operator = mathSymbol
        return;
    }
    if (calculator.firstNumber === null){
        calculator.firstNumber = displayNumber;
    }
    else if (operator){
        let result = operate(calculator.firstNumber, displayNumber, calculator.operator);
        if (result.toString().includes(".")) {
            calculator.displayCalculator = result.toFixed(4);
        }
        else{
            calculator.displayCalculator = result.toString();
            calculator.firstNumber = result;
        }  
    }
    calculator.waitForSecondNumber = true;
    calculator.operator = mathSymbol;
}

function operate(firstNumber, secondNumber, operator){
   if (operator === "+"){
    return firstNumber + secondNumber;
   }
   else if (operator === "-"){
    return firstNumber - secondNumber;
   }
   else if (operator === "*") {
    return firstNumber * secondNumber;
   }
   else if (operator === "/"){
    return firstNumber / secondNumber;
   }
}

// Handle every pushed button
buttons.forEach(button =>{
    button.addEventListener("click", (e)=>{
        const target = e.target;
        if (target.classList.contains("operator")){
            operator(target.value);
            updateDisplay();
        }
        else if(target.classList.contains("number")){
            firstNumber(target.value);
            updateDisplay();
        }
        else if (target.classList.contains("decimal")){
            decimal(target.value);
            updateDisplay();
        }
        else if (target.classList.contains("clear")) {
            clearAll();
            updateDisplay();
        }
        else if (target.classList.contains("delete")) {
            backspace();
            updateDisplay();
        }
    })
})
