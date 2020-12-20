import { input } from './input.js';

const day20 = () => {
  const createTile = currentTile => {
    const name = currentTile[0];
    const index = name.indexOf(' ');

    const tileId = parseInt(name.substr(index + 1));

    const top = currentTile[1];
    const down = currentTile[currentTile.length - 1];
    const left = currentTile
      .map(l => l[0])
      .join('')
      .substring(1);
    const right = currentTile
      .map(l => l[l.length - 1])
      .join('')
      .substring(1);
    return { tileId, top, down, left, right };
  };

  const parseInput = () => {
    let currentTile = [];
    const lines = input.split('\n');

    const tiles = [];
    for (let line of lines) {
      if (line.trim() === '') {
        tiles.push(createTile(currentTile));
        currentTile = [];
      } else {
        currentTile.push(line);
      }
    }
    if (currentTile.length > 0) tiles.push(createTile(currentTile));
    return tiles;
  };

  const flip = line =>
    [...line]
      .map((c, index, array) => array[array.length - 1 - index])
      .join('');

  const hasMatch = (line, tiles) => {
    return tiles.some(tile => {
      const { top, left, right, down } = tile;
      if (top === line || left === line || right === line || down === line) {
        return true;
      }
      const f = flip(line);
      if (top === f || left === f || right === f || down === f) {
        return true;
      }
      return false;
    });
  };

  const neighborCount = (tile, otherTiles) => {
    const { top, left, right, down } = tile;
    return [
      hasMatch(top, otherTiles),
      hasMatch(left, otherTiles),
      hasMatch(right, otherTiles),
      hasMatch(down, otherTiles),
    ]
      .map(match => (match ? 1 : 0))
      .reduce((acc, c) => acc + c, 0);
  };

  const task1 = () => {
    const tiles = parseInput();

    return tiles
      .map((tile, i) => {
        return {
          tileId: tile.tileId,
          count: neighborCount(tile, [
            ...tiles.slice(0, i),
            ...tiles.slice(i + 1),
          ]),
        };
      })
      .filter(obj => obj.count == 2)
      .reduce((acc, c) => acc * c.tileId, 1);
  };

  const task2 = () => {};

  console.log(`Day 20: Jurassic Jigsaw 
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day20();
console.timeEnd('Time:');
