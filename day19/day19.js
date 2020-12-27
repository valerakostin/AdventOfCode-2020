import { fstat } from 'fs';
import { input } from './input.js';

const day19 = () => {
  function initialReplacement(map, replacement) {
    for (let values of map.values()) {
      for (let index = 0; index < values.length; index++) {
        const array = values[index];

        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (replacement.has(element)) {
            const newValue = replacement.get(element);
            array[i] = newValue;
          }
        }
      }
    }
  }

  function parseInput() {
    const lines = input.split('\n');
    const map = new Map();
    const messages = [];
    const replacement = new Map();
    let i = 0;
    for (i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') break;

      const index = line.indexOf(':');
      const rule = +line.substring(0, index).trim();
      const definition = line.substring(index + 1, line.length).trim();
      const defItems = definition.split('|');

      if (
        (defItems.length == 1 && defItems[0] === '"a"') ||
        defItems[0] === '"b"'
      ) {
        replacement.set(rule, defItems[0].substring(1, 2));
      } else {
        const ruleDefinitions = [];
        for (let def of defItems) {
          const d = def
            .trim()
            .split(' ')
            .map(x => +x);
          ruleDefinitions.push(d);
        }
        map.set(rule, ruleDefinitions);
      }
    }

    for (let j = i + 1; j < lines.length; j++) {
      messages.push(lines[j]);
    }

    initialReplacement(map, replacement);

    return { rules: map, messages };
  }

  function allValuesResolved(values) {
    for (let value of values) {
      for (let element of value) {
        if (Number.isFinite(element)) return false;
      }
    }
    return true;
  }

  function collectResolved(map) {
    const resolved = new Map();
    for (let [key, values] of map) {
      if (allValuesResolved(values)) {
        resolved.set(key, values);
      }
    }
    return resolved;
  }

  function firstReplacementKey(values, resolved) {
    for (let value of values) {
      for (let element of value) {
        if (resolved.has(element)) {
          return element;
        }
      }
    }
    return null;
  }

  function replaceAvailable(map, ready) {
    const keys = map.keys();

    for (let key of keys) {
      let replacement = firstReplacementKey(map.get(key), ready);

      while (replacement) {
        const newValues = [];
        const values = map.get(key);
        const tokens = ready.get(replacement);

        for (let value of values) {
          const index = value.indexOf(replacement);
          if (index === -1) {
            newValues.push(value);
          } else {
            for (let token of tokens) {
              const newToken = token.join();
              const newArr = [...value];
              newArr[index] = newToken;
              newValues.push(newArr);
            }
          }
        }
        map.set(key, newValues);
        replacement = firstReplacementKey(map.get(key), ready);
      }
    }
  }

  function explodeRules(map, isRecursive = map => false) {
    const ready = new Map();

    while (map.size > 0) {
      const resolved = collectResolved(map);

      for (let key of resolved.keys()) {
        map.delete(key);
      }
      for (let [rk, rv] of resolved.entries()) {
        ready.set(rk, rv);
      }
      replaceAvailable(map, ready);

      if (isRecursive(map)) break;
    }
    return ready;
  }

  const task1 = () => {
    const data = parseInput();
    const ready = explodeRules(data.rules);
    const rules = new Set(
      ready.get(0).map(it => it.join('').split(',').join(''))
    );
    let messageSize = 0;
    for (let r of rules) {
      messageSize = r.length;
      break;
    }
    return data.messages
      .filter(message => messageSize === message.length && rules.has(message))
      .reduce((acc, _) => acc + 1, 0);
  };

  const task2 = () => {
    const data = parseInput();

    data.rules.set(8, [[42], [42, 8]]);
    data.rules.set(11, [
      [42, 31],
      [42, 11, 31],
    ]);

    const ready = explodeRules(
      data.rules,
      m => m.size === 3 && m.has(8) && m.has(11)
    );
    const rules42 = new Set(
      ready.get(42).map(it => it.join('').split(',').join(''))
    );

    const rules31 = new Set(
      ready.get(31).map(it => it.join('').split(',').join(''))
    );
    let sum = 0;
    let patternSize = 0;
    for (let rule of rules42) {
      patternSize = rule.length;
      break;
    }
    for (let message of data.messages) {
      let pass42 = [];
      let pass31 = [];
      let check42 = true;
      let isValid = true;
      for (let i = 0; i < message.length; i = i + patternSize) {
        let str = message.substring(i, i + patternSize);
        if (check42) {
          if (rules42.has(str)) {
            pass42.push(str);
          } else if (rules31.has(str)) {
            check42 = false;
            pass31.push(str);
          } else {
            isValid = false;
            break;
          }
        } else if (rules31.has(str)) {
          pass31.push(str);
        } else {
          isValid = false;
          break;
        }
      }
      if (isValid && pass42.length > pass31.length && pass31.length > 0) {
        sum++;
      }
    }

    return sum;
  };

  console.log(`Day 19: Monster Messages
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day19();
console.timeEnd('Time:');
