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
            calculator.operator = null;
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
        calculator.operator = mathSymbol;
        console.log(calculator);
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
            console.log(calculator);
        }
        else if(target.classList.contains("number")){
            firstNumber(target.value);
            updateDisplay();
            console.log(calculator);
        }
        else if (target.classList.contains("decimal")){
            decimal(target.value);
            updateDisplay();
            console.log(calculator);
        }
        else if (target.classList.contains("clear")) {
            clearAll();
            updateDisplay();
        }
        else if (target.classList.contains("delete")) {
            backspace();
            updateDisplay();
            console.log(calculator);
        }
    })
})





















// const display = document.querySelector("#display");
// const buttons = document.querySelectorAll(".button");
// const equals = document.querySelector(".equals");
// let displayCalc = "";

// buttons.forEach(button => {
//     button.addEventListener("click", ()=>{
//         let btnValue = button.getAttribute("value");

//         if (btnValue != "clear" && btnValue !="delete") {
//             displayCalc += btnValue;
//             display.textContent = displayCalc;
//         }
//         else if (btnValue == "delete") {
//             displayCalc = displayCalc.slice(0, -1);
//             display.textContent = displayCalc;
//         }
//         else if (btnValue == "clear") {
//             displayCalc = "";
//             display.textContent = displayCalc;
//         }

//         if (displayCalc.startsWith("0")) {
//             displayCalc = displayCalc.replace(/^0*/g,"0").replace(/^0*(\d)/g, "$1");
//             display.textContent = displayCalc;
//         }

//         if (displayCalc.includes(".")) {
//             displayCalc = displayCalc.replace(/\.+/g, ".");
//             display.textContent = displayCalc;
//         }
//     })
// })

// equals.addEventListener("click", () => {
//     try {
//          display.textContent = operate(displayCalc); 
//          if(displayCalc.includes("."))
//          display.textContent = operate(displayCalc).toFixed(6);
//         }
//     catch (error) {
//         alert("That operation is literally impossible");
//         displayCalc = "";
//         display.textContent = displayCalc;
//     }

//     if (displayCalc.endsWith("/")) {
//         alert("That operation is literally impossible");
//         displayCalc = "";
//         display.textContent = displayCalc;
//     }
//     if (displayCalc.includes("+") || displayCalc.includes("-") || 
//         displayCalc.includes("*")|| displayCalc.includes("/")) {
//         let result = eval(displayCalc).toFixed(6);
//         displayCalc = result.toString(); 
//     }
// })
