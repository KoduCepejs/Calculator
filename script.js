document.addEventListener("DOMContentLoaded", function () {
    const keys = document.querySelectorAll('.key');
    const displayInput = document.querySelector('.display .input');
    const displayOutput = document.querySelector('.display .output');

    let input = "";

    keys.forEach(key => {
        const value = key.dataset.key;

        key.addEventListener('click', () => {
            if (value === "clear") {
                input = "";
                displayInput.textContent = "";
                displayOutput.textContent = "";
            } else if (value === "backspace") {
                input = input.slice(0, -1);
                displayInput.textContent = input;
            } else if (value === "=") {
                try {
                    let result = eval(input);
                    displayOutput.textContent = result;
                    input = result.toString();
                    displayInput.textContent = input;
                } catch (error) {
                    displayOutput.textContent = 'Error';
                }
            } else if (value === "brackets") {
                input += (input.indexOf("(") === -1 ||
                    (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))) ?
                    "(" : ")";
                displayInput.textContent = input;
            } else {
                if (validateInput(value, input)) {
                    input += value;
                    displayInput.textContent = input;
                }
            }
        });
    });

    function validateInput(value, input) {
        const lastInput = input.slice(-1);
        const operators = ["+", "-", "*", "/"];

        if (value === "." && lastInput === ".") {
            return false;
        }

        if (operators.includes(value)) {
            return !(operators.includes(lastInput) || (value === "-" && (lastInput === "" || lastInput === "(")));
        }

        return true;
    }
});
