const Stack = require("../lib/stack");

const postfix = (expression) => {
    let result = "";
    const stack = new Stack();

    // Removing the spaces from the expression
    expression = expression.split(" ").join("");
    
    const operator = ["+", "-", "/", "*"];
    const highPrecedenceOperator = ["/", "*"];
    const lowerPrecedenceOperator = ["+", "-"];

    // Iterating through each character in the expression
    for (let i = 0; i < expression.length; i++) {
        const currentChar = expression[i];
        // If current char is an operand, append it to result
        if (!operator.includes(currentChar) && currentChar !== "(" && currentChar !== ")") {
            result += currentChar;
        }

        // If current char is an operator:
        if (operator.includes(currentChar)) {
            // If stack is empty, push operator into stack
            if (!stack.top) {
                stack.push(currentChar);
            } else if (stack.top) {
                // Stack is not empty
                // If top of the stack is ( or current operator has higher precedence than the operator on the top of the stack
                if (stack.top.value === "(" || highPrecedenceOperator.includes(currentChar) && lowerPrecedenceOperator.includes(stack.top.value)) {
                    // Push the operator into the stack
                    stack.push(currentChar);
                } else {
                    // Current operator is of lower or equal precedence to the operator on the top of the stack
                    let poppedValue = stack.pop();
                    // While there are items in the stack AND the operator popped from the stack is of lower precedence, 
                    // AND the item popped from the stack is not a ( or ), add the popped off item to the result and pop another item from the stack
                    while (stack.top && lowerPrecedenceOperator.includes(poppedValue) && poppedValue !== "(" && poppedValue !== ")") {
                        result += poppedValue;
                        poppedValue = stack.pop();
                    }
                    // Once the stack is empty OR the operator popped off is of higher precedence OR a ( or ) was popped off, the following will run:
                    // Add the popped off value to the result and push the currentChar into the stack
                    result += poppedValue;
                    stack.push(currentChar);
                }
            }
        }

        if (currentChar === "(") {
            stack.push(expression[i]);
        }

        // If currentChar is a ), we need to pop off items from the stack until we find the matching (
        if (currentChar === ")") {
            let poppedValue = stack.pop();
            while (stack.top && poppedValue !== "(") {
                // While there are items in the stack and the removed item is not a (, will continue to pop off values and add it to the result
                result += poppedValue;
                poppedValue = stack.pop();
            }
        }
    }

    // Pop any remaining operators from the stack and append them to the result
    while (stack.top) {
        result += stack.pop();
    }

    // Adding the spaces back into the final postfix string
    let finalResult = "";

    for (let i = 0; i < result.length; i++) {
        if (i !== result.length - 1) {
            finalResult += result[i] + " ";
        } else {
            finalResult += result[i];
        }
    }
    console.log("infix:", expression, "postfix:", finalResult);
    return finalResult;
};

module.exports = postfix;
