import { input } from './input.js';

const day17 = () => {
  const coordsToString = (x, y, z) => `${x}_${y}_${z}`;
  const coordsToString4D = (x, y, z, w) => `${x}_${y}_${z}_${w}`;

  const parseInput = () => {
    const state = new Set();
    const rows = input.split('\n');
    for (let j = 0; j < rows.length; j++) {
      const line = rows[j];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '#') {
          state.add(coordsToString(i, j, 0));
        }
      }
    }
    return state;
  };

  const parseInput4D = () => {
    const state = new Set();
    const rows = input.split('\n');
    for (let j = 0; j < rows.length; j++) {
      const line = rows[j];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '#') {
          state.add(coordsToString4D(i, j, 0, 0));
        }
      }
    }
    return state;
  };

  const compute3DPermutations = () => {
    const perms = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) {
            continue;
          } else {
            perms.push([x, y, z]);
          }
        }
      }
    }
    return perms;
  };

  const compute4DPermutations = () => {
    const perms = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          for (let w = -1; w <= 1; w++) {
            if (x === 0 && y === 0 && z === 0 && w === 0) {
              continue;
            } else {
              perms.push([x, y, z, w]);
            }
          }
        }
      }
    }
    return perms;
  };

  const permutations = compute3DPermutations();
  const permutations4D = compute4DPermutations();

  const toCoords = element => element.split('_').map(x => +x);

  const findMinMax = data => {
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minZ = Number.MAX_SAFE_INTEGER;
    let maxZ = Number.MIN_SAFE_INTEGER;

    for (let element of data) {
      const coords = toCoords(element);
      minX = Math.min(minX, coords[0]);
      maxX = Math.max(maxX, coords[0]);

      minY = Math.min(minY, coords[1]);
      maxY = Math.max(maxY, coords[1]);

      minZ = Math.min(minZ, coords[2]);
      maxZ = Math.max(maxZ, coords[2]);
    }
    return [minX, maxX, minY, maxY, minZ, maxZ];
  };

  const findMinMax4D = data => {
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minZ = Number.MAX_SAFE_INTEGER;
    let maxZ = Number.MIN_SAFE_INTEGER;
    let minW = Number.MAX_SAFE_INTEGER;
    let maxW = Number.MIN_SAFE_INTEGER;

    for (let element of data) {
      const coords = toCoords(element);
      minX = Math.min(minX, coords[0]);
      maxX = Math.max(maxX, coords[0]);

      minY = Math.min(minY, coords[1]);
      maxY = Math.max(maxY, coords[1]);

      minZ = Math.min(minZ, coords[2]);
      maxZ = Math.max(maxZ, coords[2]);

      minW = Math.min(minW, coords[3]);
      maxW = Math.max(maxW, coords[3]);
    }
    return [minX, maxX, minY, maxY, minZ, maxZ, minW, maxW];
  };

  const getNeighbors = element => {
    const [x, y, z] = toCoords(element);
    const neighbors = [];

    for (let permutation of permutations) {
      const [nx, ny, nz] = permutation;
      const neighbor = coordsToString(nx + x, ny + y, nz + z);
      neighbors.push(neighbor);
    }
    return neighbors;
  };

  const getNeighbors4D = element => {
    const [x, y, z, w] = toCoords(element);
    const neighbors = [];

    for (let permutation of permutations4D) {
      const [nx, ny, nz, nw] = permutation;
      const neighbor = coordsToString4D(nx + x, ny + y, nz + z, nw + w);
      neighbors.push(neighbor);
    }
    return neighbors;
  };

  const task1 = () => {
    let currentState = parseInput();

    let newState = new Set();
    let [minX, maxX, minY, maxY, minZ, maxZ] = findMinMax(currentState);
    for (let step = 0; step < 6; step++) {
      const offset = step + 1;
      minX -= offset;
      maxX += offset;
      minY -= offset;
      maxY += offset;
      minZ -= offset;
      maxZ += offset;
      for (let x = minX; x < maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          for (let z = minZ; z <= maxZ; z++) {
            const coords = coordsToString(x, y, z);

            const neighbors = getNeighbors(coords);

            const neighborCount = neighbors.reduce(
              (acc, c) => (currentState.has(c) ? acc + 1 : acc),
              0
            );
            if (currentState.has(coords)) {
              // active
              if (neighborCount === 2 || neighborCount === 3)
                newState.add(coords);
            } // inactive
            else if (neighborCount === 3) {
              newState.add(coords);
            }
          }
        }
      }

      currentState = newState;
      newState = new Set();
    }
    return currentState.size;
  };

  const task2 = () => {
    let currentState = parseInput4D();

    let newState = new Set();
    let [minX, maxX, minY, maxY, minZ, maxZ, minW, maxW] = findMinMax4D(
      currentState
    );
    for (let step = 0; step < 6; step++) {
      const offset = step + 1;
      console.log(`step ${step}`);
      minX -= offset;
      maxX += offset;
      minY -= offset;
      maxY += offset;
      minZ -= offset;
      maxZ += offset;
      minW -= offset;
      maxW += offset;
      for (let x = minX; x < maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          for (let z = minZ; z <= maxZ; z++) {
            for (let w = minW; w <= maxW; w++) {
              const coords = coordsToString4D(x, y, z, w);

              const neighbors = getNeighbors4D(coords);

              const neighborCount = neighbors.reduce(
                (acc, c) => (currentState.has(c) ? acc + 1 : acc),
                0
              );
              if (currentState.has(coords)) {
                // active
                if (neighborCount === 2 || neighborCount === 3)
                  newState.add(coords);
              } // inactive
              else if (neighborCount === 3) {
                newState.add(coords);
              }
            }
          }
        }
      }
      currentState = newState;
      newState = new Set();
    }
    return currentState.size;
  };

  console.log(`Day 17: Conway Cubes
Task 1: ${task1()}
Task 2: ${task2()}
 `);
};
console.time('Time:');
day17();
console.timeEnd('Time:');
