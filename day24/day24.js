import { input } from './input.js';

const day24 = () => {
  const collectTiles = () => {
    const lines = input.split('\n');

    const locs = [];
    for (let line of lines) {
      let dirs = line.split('ne').join('+y');
      dirs = dirs.split('sw').join('-y');
      dirs = dirs.split('se').join('+z');
      dirs = dirs.split('nw').join('-z');
      dirs = dirs.split('e').join('+x');
      dirs = dirs.split('w').join('-x');

      let x = 0;
      let y = 0;
      let z = 0;
      for (let i = 0; i < dirs.length; i = i + 2) {
        const dir = dirs[i] + dirs[i + 1];
        if (dir === '+x') {
          x = x + 1;
          y = y - 1;
        } else if (dir === '-x') {
          x = x - 1;
          y = y + 1;
        } else if (dir === '+y') {
          x = x + 1;
          z = z - 1;
        } else if (dir === '-y') {
          x = x - 1;
          z = z + 1;
        } else if (dir === '-z') {
          y = y + 1;
          z = z - 1;
        } else if (dir === '+z') {
          y = y - 1;
          z = z + 1;
        }
      }
      const loc = { x, y, z };
      locs.push(loc);
    }
    return locs;
  };

  const toString = (x, y, z) => x + '_' + y + '_' + z;

  const toCoords = str => str.split('_').map(x => +x);

  const blackTiles = () => {
    const locs = collectTiles();
    const items = locs.map(c => toString(c.x, c.y, c.z));
    const black = new Set();
    for (let loc of items) {
      if (black.has(loc)) black.delete(loc);
      else black.add(loc);
    }
    return black;
  };

  const task1 = () => {
    return blackTiles().size;
  };

  const findMinMax = currentState => {
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minZ = Number.MAX_SAFE_INTEGER;
    let maxZ = Number.MIN_SAFE_INTEGER;

    for (let line of currentState) {
      const [x, y, z] = toCoords(line);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);

      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);

      minZ = Math.min(minZ, z);
      maxZ = Math.max(maxZ, z);
    }
    return { minX, maxX, minY, maxY, minZ, maxZ };
  };

  const getNeighbors = coords => {
    const [x, y, z] = coords;
    const neighbors = [];
    neighbors.push(toString(x - 1, y + 1, z));
    neighbors.push(toString(x, y + 1, z - 1));
    neighbors.push(toString(x + 1, y, z - 1));
    neighbors.push(toString(x + 1, y - 1, z));
    neighbors.push(toString(x, y - 1, z + 1));
    neighbors.push(toString(x - 1, y, z + 1));

    return neighbors;
  };

  const task2 = () => {
    let currentState = blackTiles();

    for (let day = 1; day <= 100; day++) {
      let { minX, maxX, minY, maxY, minZ, maxZ } = findMinMax(currentState);
      minX -= 1;
      maxX += 1;
      minY -= 1;
      maxY += 1;
      minZ -= 1;
      maxZ += 1;
      const newState = new Set();
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          for (let z = minZ; z <= maxZ; z++) {
            const isBlack = currentState.has(toString(x, y, z));

            const neighbors = getNeighbors([x, y, z]);

            let black = 0;
            //  console.log(neighbors);
            for (let neighbor of neighbors) {
              if (currentState.has(neighbor)) black = black + 1;
            }

            if (isBlack) {
              if (black !== 0 && black <= 2) {
                newState.add(toString(x, y, z));
              }
            } else {
              if (black === 2) {
                newState.add(toString(x, y, z));
              }
              // process white
            }
          }
        }
      }
      currentState = newState;
      console.log(`Day: ${day}:  ${currentState.size} `);
    }
    return currentState.size;
  };

  console.log(`Day 24: Lobby Layout
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day24();
console.timeEnd('Time:');
