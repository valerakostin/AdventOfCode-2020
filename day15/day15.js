import { input } from './input.js';

const day15 = () => {
  const updateIndices = (memory, value, index) => {
    if (!memory.has(value)) {
      memory.set(value, [index]);
    } else {
      const indices = memory.get(value);
      const firstIndex = indices.length === 1 ? indices[0] : indices[1];
      memory.set(value, [firstIndex, index]);
    }
  };
  const computeNth = (nth) => {
    const data = input.split(',').map((x) => +x);

    const memory = new Map();

    // initialize
    data.forEach((value, index) => memory.set(value, [index]));
    let currentNth = data[data.length - 1];

    for (let index = data.length; index < nth; index++) {
      const currentNtIndices = memory.get(currentNth);

      if (currentNtIndices.length === 1) {
        currentNth = 0;
        updateIndices(memory, currentNth, index);
      } else if (currentNtIndices.length === 2) {
        currentNth = currentNtIndices[1] - currentNtIndices[0];
        updateIndices(memory, currentNth, index);
      }
    }
    return currentNth;
  };

  const task1 = () => {
    return computeNth(2020);
  };

  const task2 = () => {
    return computeNth(30000000);
  };

  console.log(`Day 15: Rambunctious Recitation
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day15();
console.timeEnd('Time:');
