const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");
const equals = document.querySelector(".equals");
let displayCalc = "";

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

        if (displayCalc.startsWith("0")) {
            displayCalc = displayCalc.replace(/^0*/g,"0").replace(/^0*(\d)/g, "$1");
            display.textContent = displayCalc;
        }

        if (displayCalc.includes(".")) {
            displayCalc = displayCalc.replace(/\.+/g, ".");
            display.textContent = displayCalc;
        }
    })
})

equals.addEventListener("click", () => {
    try {
        if (eval(displayCalc) != Infinity) {
         display.textContent = eval(displayCalc); 
         if(displayCalc.includes("."))
         display.textContent = eval(displayCalc).toFixed(2);
        }
        else if (eval(displayCalc) == Infinity) {
            alert("That operation is shady...");
            displayCalc = "";
            display.textContent = displayCalc;
        }
    } catch (error) {
        alert("That operation is literally impossible");
        displayCalc = "";
        display.textContent = displayCalc;
    }

    if (displayCalc.endsWith("/")) {
        alert("That operation is literally impossible");
        displayCalc = "";
        display.textContent = displayCalc;
    }
    if (displayCalc.includes("+") || displayCalc.includes("-") || 
        displayCalc.includes("*")|| displayCalc.includes("/")) {
        let result = eval(displayCalc).toFixed(2);
        displayCalc = result.toString(); 
    }
})
