const Stack = require("../lib/stack");

const match = (expression) => {
    const stack = new Stack();

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "(") {
            stack.push(expression[i]);
        } else if (expression[i] === ")") {
            if (stack.top) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    if (!stack.top) {
        return true;
    } 
    return false;
};

module.exports = match;
