import { input } from './input.js';

const day16 = () => {
  const parseRule = (line) => {
    const [ruleName, ranges] = line.split(':');
    const [first, second] = ranges.trim().split('or');
    const [fLow, fHigh] = first.trim().split('-');
    const [sLow, sHigh] = second.trim().split('-');

    const intervals = [
      [+fLow, +fHigh],
      [+sLow, +sHigh],
    ];

    return { ruleName, intervals };
  };

  const parseInput = () => {
    const rules = [];
    const tickets = [];
    const myTicket = [];
    const lines = input.split('\n');

    for (let line of lines) {
      if (
        line.trim() === '' ||
        line === 'your ticket:' ||
        line === 'nearby tickets:'
      ) {
        continue;
      } else {
        const firstCharacter = line[0];
        if (!(firstCharacter >= '0' && firstCharacter <= '9')) {
          const currentRule = parseRule(line);
          rules.push(currentRule);
        } else {
          if (myTicket.length === 0) {
            myTicket.push(line.split(',').map((x) => +x));
          } else {
            const ticket = line.split(',').map((x) => +x);
            tickets.push(ticket);
          }
        }
      }
    }

    return { rules, myTicket, tickets };
  };

  const isValidNumber = (n, rules) => {
    return rules.some((rule) => {
      const [first, second] = rule.intervals;
      return (
        (n >= first[0] && n <= first[1]) || (n >= second[0] && n <= second[1])
      );
    });
  };

  const getInvalidElement = (ticket, rules) => {
    for (let n of ticket) {
      if (!isValidNumber(n, rules)) {
        return n;
      }
    }
  };

  const task1 = () => {
    const data = parseInput();
    const { rules, tickets } = data;

    return tickets
      .map((t) => getInvalidElement(t, rules))
      .filter((n) => n)
      .reduce((acc, c) => acc + c, 0);
  };

  const task2 = () => {};

  console.log(`Day 16: Ticket Translation
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time("Time:")
day16();
console.timeEnd("Time:")
