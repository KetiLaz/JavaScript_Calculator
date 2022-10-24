const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".all_buttons");
const calculator = {
    displayCalculator: "0",
    firstNumber: null,
    waitForSecondNumber: false,
    operator: null
};

function firstNumber(number){
    let displayCalculator = calculator.displayCalculator;
    calculator.displayCalculator = displayCalculator === "0" ? number :displayCalculator + number;
    
}

function updateDisplay() {
    display.textContent = calculator.displayCalculator;
}

function decimal(dot) {
    if(!calculator.displayCalculator.includes(".")){
        calculator.displayCalculator += dot;
    }
}

function backspace() {
    let displayCalc = calculator.displayCalculator;
    displayCalc = displayCalc.slice(0, -1);
    display.textContent = displayCalc;
    console.log(displayCalc)

}

function clearAll() {
    calculator.displayCalculator = "";
}

buttons.forEach(button =>{
    button.addEventListener("click", (e)=>{
        const target = e.target;
        if (target.classList.contains("operator")){
            console.log("operator", target.value);
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
