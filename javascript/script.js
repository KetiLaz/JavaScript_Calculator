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
        else {
            displayCalc = "";
            display.textContent = displayCalc;
        }
    })
})

equals.addEventListener("click", () => {
    try {
        display.textContent = eval(displayCalc);
    } catch (error) {
        alert("That ain't happening. Don't try to break my calculator!");
    }
})
