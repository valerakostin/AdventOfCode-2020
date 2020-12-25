import { input } from './input.js';

const day25 = () => {
  const task1 = () => {
    let [pk1, pk2] = input.split('\n').map(x => +x);
    let value = 1;
    const subjectNumber = 7;
    const divider = 20201227;
    let loop = 0;
    while (value != pk1) {
      value = (value * subjectNumber) % divider;
      loop++;
    }
    let key = 1;
    for (let i = 0; i < loop; i++) {
      key = (key * pk2) % divider;
    }
    return key;
  };

  console.log(`Day 25: Combo Breaker
Task 1: ${task1()}`);
};
console.time('Time:');
day25();
console.timeEnd('Time:');
