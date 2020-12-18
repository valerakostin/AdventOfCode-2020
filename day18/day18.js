import { input } from './input.js';

const day18 = () => {
  const allExpressions = parseInput();

  function parseInput() {
    return input.split('\n').map(line => parseTokens(line));
  }

  function parseTokens(line) {
    const characters = [...line];

    const tokens = [];

    let element = '';
    for (let ch of characters) {
      if (ch === '+' || ch === '*' || ch === '(') {
        tokens.push(ch);
      } else if (ch == ')') {
        if (element !== '') {
          tokens.push(+element);
          element = '';
        }
        tokens.push(ch);
      } else if (ch !== ' ') {
        element += ch;
      } else {
        if (element !== '') {
          tokens.push(+element);
          element = '';
        }
      }
    }
    if (element != '') {
      if (element == ')') {
        tokens.push(element);
      } else {
        tokens.push(+element);
      }
    }
    return tokens;
  }

  const executeOperation = (operand1, operand2, operator) =>
    operator === '+' ? operand1 + operand2 : operand1 * operand2;

  const solveExpression = (tokens, hasPrecedenceFunc = ( ) => true) => {
    const values = [];
    const operations = [];

    const processOperation = () => {
      values.push(
        executeOperation(values.pop(), values.pop(), operations.pop())
      );
    };

    for (let token of tokens) {
      if (!isNaN(token)) {
        values.push(token);
      } else if (token === '+' || token === '*') {
        while (
          operations.length > 0 &&
          operations[operations.length - 1] !== '(' &&
          hasPrecedenceFunc(token, operations[operations.length - 1])
        ) {
          processOperation();
        }
        operations.push(token);
      } else if (token === '(') {
        operations.push(token);
      } else if (token === ')') {
        while (
          operations.length > 0 &&
          operations[operations.length - 1] != '('
        )
          processOperation();

        if (operations[operations.length - 1] === '(') {
          operations.pop();
        }
      }
    }
    while (operations.length > 0) {
      processOperation();
    }
    return values.pop();
  };

  const task1 = () => {
    return allExpressions
      .map(expressionTokens => solveExpression(expressionTokens))
      .reduce((acc, c) => acc + c, 0);
  };

  const task2 = () => {
    return allExpressions
      .map(expressionTokens =>
        solveExpression(
          expressionTokens,
          (op1, op2) => op1 === op2 || op1 === '*'
        )
      )
      .reduce((acc, c) => acc + c, 0);
  };

  console.log(`Day 18: Operation Order
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:')
day18();
console.timeEnd('Time:')
