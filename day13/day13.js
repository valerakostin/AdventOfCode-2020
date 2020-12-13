import { input } from './input.js';

const day13 = () => {
  const data = input.split('\n');

  const waitTime = (n, bus) => {
    const next = Math.ceil(n / bus) * bus;
    return next - n;
  };
  const task1 = () => {
    const earliestTimestamp = +data[0];
    return data[1]
      .split(',')
      .filter((bus) => bus !== 'x')
      .map((bus) => {
        return { bus: +bus, waitTime: waitTime(earliestTimestamp, +bus) };
      })
      .sort((a, b) => a.waitTime - b.waitTime)
      .slice(0, 1)
      .reduce((_, a) => a.bus * a.waitTime, 0);
  };

  const task2 = () => {
    const buses = [];
    const rawData = data[1].split(',');

    for (let index = 0; index < rawData.length; index++) {
      const element = rawData[index];
      if (element !== 'x') buses.push({ bus: +element, offset: index });
    }

    const maxBus = [...buses].sort((a, b) => b.bus - a.bus)[0];
    const max = 100000000000000;

    const next = Math.ceil(max / maxBus.bus);
    const initial = next * maxBus.bus;
    //const initial = maxBus.bus;

    const offset = maxBus.offset;

    for (let index = initial; ; index = index + maxBus.bus) {
      if (buses.every((bus) => (index - offset + bus.offset) % bus.bus === 0))
        return index - offset;
    }
  };

  console.log(`Day 13: Shuttle Search
Task 1: ${task1()}
Task 2: ${task2()} `);
};

console.time('Time:');
day13();
console.timeEnd('Time:');
