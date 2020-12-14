import { input } from './input.js';

const day14 = () => {
  function parseCommand(line) {
    if (line.startsWith('mask')) {
      const mask = [...line.substring(line.length - 36)];
      return { command: 'mask', mask };
    } else {
      const index = line.indexOf('=');
      const numberStr = line.substring(index + 1).trim();
      const s = line.indexOf('[');
      const e = line.indexOf(']');
      const address = +line.substring(s + 1, e);
      const value = convertToBinaryArray(numberStr);
      return { command: 'mem', address, value };
    }
  }

  function convertToBinaryArray(str) {
    const array = new Array(36);
    array.fill(0, 0, 35);
    const binaryString = (+str).toString(2);

    const startIndex = array.length - binaryString.length;

    for (let i = startIndex; i < array.length; i++) {
      array[i] = +binaryString[i - startIndex];
    }
    return array;
  }

  const maskNumberV1 = (maskArray, numberArray) => {
    for (let i = 0; i < maskArray.length; i++) {
      if (maskArray[i] !== 'X') {
        numberArray[i] = +maskArray[i];
      }
    }
    return numberArray;
  };

  const convertToNumber = (bitArray) => {
    let sum = 0;
    const start = bitArray.length - 1;
    for (let i = start; i >= 0; i--) {
      const index = start - i;
      const pow = 2 ** index;
      sum += bitArray[i] * pow;
    }
    return sum;
  };

  const sumMemory = (memory) => {
    let sum = 0;
    for (let value of memory.values()) {
      sum += convertToNumber(value);
    }
    return sum;
  };

  const version1 = (memory, mask, address, value) => {
    const maskedNumber = maskNumberV1(mask, value);
    memory.set(address, maskedNumber);
  };

  const executeProgram = (memoryUpdater) => {
    const commands = input.split('\n').map((line) => parseCommand(line));
    let mask = [];
    const memory = new Map();

    for (let command of commands) {
      if (command.command === 'mask') {
        mask = command.mask;
      } else {
        memoryUpdater(memory, mask, command.address, command.value);
      }
    }
    return sumMemory(memory);
  };

  const task1 = () => {
    return executeProgram(version1);
  };

  const maskNumberV2 = (maskArray, numberArray) => {
    for (let i = 0; i < maskArray.length; i++) {
      const value = maskArray[i];
      if (value === '1' || value === 'X') {
        numberArray[i] = value;
      }
    }
    return numberArray;
  };

  const collectXIndices = (maskArray) => {
    const xIndices = [];
    for (let i = 0; i < maskArray.length; i++) {
      if (maskArray[i] === 'X') {
        xIndices.push(i);
      }
    }
    return xIndices;
  };

  const generateAddresses = (xIndices, newMask) => {
    const addresses = [];
    const size = xIndices.length;
    const combinations = 2 ** xIndices.length;

    for (let i = 0; i < combinations; i++) {
      const v = [...i.toString(2).padStart(size, 0)].map((x) => +x);
      const copy = [...newMask];
      for (let index = 0; index < xIndices.length; index++) {
        const indexInMask = xIndices[index];
        copy[indexInMask] = v[index];
      }
      addresses.push(copy.map((x) => +x));
    }
    return addresses;
  };

  const version2 = (memory, mask, commandAddress, value) => {
    const newMask = maskNumberV2(
      mask,
      convertToBinaryArray('' + commandAddress)
    );
    const xIndices = collectXIndices(newMask);
    const addresses = generateAddresses(xIndices, newMask);
    for (let address of addresses) {
      const na = convertToNumber(address);

      memory.set(na, value);
    }
  };

  const task2 = () => {
    return executeProgram(version2);
  };

  console.log(`Day 14: Docking Data
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day14();
console.timeEnd('Time:');
