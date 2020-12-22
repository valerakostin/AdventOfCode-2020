import { input } from './input.js';

const day22 = () => {
  const parseInput = () => {
    const player1 = [];
    const player2 = [];
    let current;

    const lines = input.split('\n');

    for (let line of lines) {
      if (line !== '') {
        if (line === 'Player 1:') {
          current = player1;
        } else if (line === 'Player 2:') {
          current = player2;
        } else {
          current.push(+line);
        }
      }
    }
    return { player1, player2 };
  };

  const computeSum = array => {
    const m = array.length;
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i] * (m - i);
    }
    return sum;
  };
  const task1 = () => {
    const { player1, player2 } = parseInput();

    while (player1.length > 0 && player2.length > 0) {
      const p1 = player1.shift();
      const p2 = player2.shift();

      if (p1 > p2) {
        player1.push(p1, p2);
      } else {
        player2.push(p2, p1);
      }
    }
    return computeSum(player1.length === 0 ? player2 : player1);
  };

  const playRecursive = (player1, player2) => {
    const playedGames = new Set();
    while (player1.length > 0 && player2.length > 0) {
      const gameFingerPrint = player1.join(',') + '-' + player2.join(',');

      if (playedGames.has(gameFingerPrint)) {
        return { winner: 'player1', cards: player1 };
      }
      playedGames.add(gameFingerPrint);

      const p1 = player1.shift();
      const p2 = player2.shift();

      if (p1 <= player1.length && p2 <= player2.length) {
        const { winner } = playRecursive(
          player1.slice(0, p1),
          player2.slice(0, p2)
        );
        if (winner === 'player1') {
          player1.push(p1, p2);
        } else {
          player2.push(p2, p1);
        }
      } else {
        if (p1 > p2) {
          player1.push(p1, p2);
        } else {
          player2.push(p2, p1);
        }
      }
    }
    const winner = player1.length === 0 ? 'player2' : 'player1';
    const data = winner === 'player1' ? player1 : player2;
    return { winner, data: data };
  };

  const task2 = () => {
    const { player1, player2 } = parseInput();
    const { winner, data } = playRecursive(player1, player2);
    //  const data = winner === 'player1' ? player1 : player2;
    return computeSum(data);
  };

  console.log(`Day 22: Crab Combat
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day22();
console.timeEnd('Time:');
