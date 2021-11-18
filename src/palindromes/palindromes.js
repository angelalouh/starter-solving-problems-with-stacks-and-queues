const Stack = require("../lib/stack");

const isPalindrome = (sentence) => {
  // Removing all spaces and punctuation from the sentence and make all characters lowercase
  sentence = sentence.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  
  const middle = Math.floor(sentence.length / 2);

  const stack = new Stack();

  // Pushing the first half of the sentence into the stack
  for (let i = 0; i < middle; i++) {
    stack.push(sentence[i]);
  }

  // Preparing i for comparing the second half of sentence to the char popped off stack
  let i = middle;
  // If sentence has odd # of chars, setting i to skip over the middle char
  if (sentence.length % 2 === 1) {
    i = middle + 1;
  }

  // Iterating over the 2nd half of the sentence
  for (i; i < sentence.length; i++) {
    // Removing the top char from the stack
    const poppedChar = stack.pop();
    // Comparing the popped off char to the next char in the 2nd half of the sentence
    // If they are not equal, return false
    if (sentence[i] !== poppedChar) {
      return false;
    }
  }
  return true;

};

module.exports = isPalindrome;
