const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");
const equals = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");
let displayCalc = "";

// Makes the display, clear and delete work.
buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        let btnValue = button.getAttribute("value");
        if (btnValue != "clear" && btnValue !="delete") {
            displayCalc += btnValue;
            display.textContent = displayCalc;
        }
        else if (btnValue == "delete") {
            displayCalc = displayCalc.slice(0, -1);
            display.textContent = displayCalc;
        }
        else if (btnValue == "clear") {
            displayCalc = "";
            display.textContent = displayCalc;
        }
    })
})

// The = button, catch some errors like ++ or /0
equals.addEventListener("click", () => {
    try {
        if (eval(displayCalc) != Infinity) {
         display.textContent = eval(displayCalc); 
         console.log(eval(displayCalc));
        }
        else if (eval(displayCalc) == Infinity) {
            alert("That operation is shady...");
        }
    } catch (error) {
        alert("That operation is literally impossible");
        displayCalc = "";
        display.textContent = displayCalc;
    }

    if (displayCalc.includes("+") || display.includes("-") || 
    displayCalc.includes("*")|| displayCalc.includes("/")) {
        let result = eval(displayCalc);
        displayCalc = result;
    }

})
