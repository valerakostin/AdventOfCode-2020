import { input } from './input.js';

const day16 = () => {
  const parseRule = line => {
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
    let myTicket = [];
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
            myTicket = line.split(',').map(x => +x);
          } else {
            const ticket = line.split(',').map(x => +x);
            tickets.push(ticket);
          }
        }
      }
    }

    return { rules, myTicket, tickets };
  };

  const isValidNumber = (n, rules) => {
    return rules.some(rule => {
      const [first, second] = rule.intervals;
      return (
        (n >= first[0] && n <= first[1]) || (n >= second[0] && n <= second[1])
      );
    });
  };

  const getInvalidElement = (ticket, rules) =>
    ticket.find(n => !isValidNumber(n, rules));

  const task1 = () => {
    const data = parseInput();
    const { rules, tickets } = data;

    return tickets
      .map(t => getInvalidElement(t, rules))
      .filter(n => n)
      .reduce((acc, c) => acc + c, 0);
  };

  const isValidTicket = (ticket, rules) => {
    return ticket.every(x => isValidNumber(x, rules));
  };

  const isValidRuleForField = (rule, validTickets, row) => {
    const vertical = validTickets.map(l => +l[row]);
    return vertical.every(n => {
      const [first, second] = rule.intervals;
      return (
        (n >= first[0] && n <= first[1]) || (n >= second[0] && n <= second[1])
      );
    });
  };

  const computeRuleMap = (rules, validTickets) => {
    const map = new Map();
    const ticketWidth = validTickets[0].length;
    for (let rule of rules) {
      for (let i = 0; i < ticketWidth; i++) {
        if (isValidRuleForField(rule, validTickets, i)) {
          if (map.has(rule.ruleName)) {
            const indices = map.get(rule.ruleName);
            indices.push(i);
            map.set(rule.ruleName, indices);
          } else {
            map.set(rule.ruleName, [i]);
          }
        }
      }
    }
    return map;
  };

  const computeFieldIndices = map => {
    const fields = [];

    while (map.size > 0) {
      let singleKey;
      let singleIndex;

      for (let [key, value] of map.entries()) {
        if (value.length === 1) {
          singleKey = key;
          singleIndex = value[0];
          fields.push({ key: singleKey, index: singleIndex });
          break;
        }
      }
      map.delete(singleKey);
      for (let [_, value] of map.entries()) {
        const index = value.indexOf(singleIndex);
        if (index != -1) value.splice(index, 1);
      }
    }
    return fields;
  };

  const task2 = () => {
    const data = parseInput();
    const { rules, tickets, myTicket } = data;

    const validTickets = tickets.filter(x => isValidTicket(x, rules));
    validTickets.push(myTicket);
    const map = computeRuleMap(rules, validTickets);
    const fields = computeFieldIndices(map);

    return fields
      .filter(field => field.key.startsWith('departure'))
      .reduce((acc, c) => acc * myTicket[c.index], 1);
  };

  console.log(`Day 16: Ticket Translation
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day16();
console.timeEnd('Time:');
