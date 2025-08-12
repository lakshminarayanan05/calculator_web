const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            display.value = "";
        } else if (value === "=") {
            try {
                const expression = display.value;
                const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);

                if (!tokens) throw new Error("Invalid");

                for (let i = 0; i < tokens.length; i += 2) {
                    tokens[i] = parseFloat(tokens[i]);
                }

                let i = 1;
                while (i < tokens.length) {
                    if (tokens[i] === "*" || tokens[i] === "/") {
                        const result = tokens[i] === "*" 
                            ? tokens[i - 1] * tokens[i + 1]
                            : tokens[i - 1] / tokens[i + 1];
                        tokens.splice(i - 1, 3, result);
                    } else {
                        i += 2;
                    }
                }

                i = 1;
                while (i < tokens.length) {
                    if (tokens[i] === "+" || tokens[i] === "-") {
                        const result = tokens[i] === "+"
                            ? tokens[i - 1] + tokens[i + 1]
                            : tokens[i - 1] - tokens[i + 1];
                        tokens.splice(i - 1, 3, result);
                    } else {
                        i += 2;
                    }
                }

                display.value = tokens[0];
            } catch {
                display.value = "Error";
            }
        } else {
            display.value += value;
        }
    });
});
