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
    return {
      tileId,
      top,
      down,
      left,
      right,
      raw: [...currentTile.slice(1, currentTile.length)],
    };
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

  const flip = line => [...line].reverse().join('');

  const matchNeighbor = (line, tiles) => {
    const neighbor = tiles.find(tile => {
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

    return neighbor;
  };

  const getNeighbors = (tile, otherTiles) => {
    const { top, left, right, down } = tile;

    return [
      matchNeighbor(top, otherTiles),
      matchNeighbor(left, otherTiles),
      matchNeighbor(right, otherTiles),
      matchNeighbor(down, otherTiles),
    ].filter(neighbor => neighbor != undefined);
  };

  const task1 = () => {
    const tiles = parseInput();

    return tiles
      .map((tile, i) => {
        return {
          tileId: tile.tileId,
          neighbors: getNeighbors(tile, [
            ...tiles.slice(0, i),
            ...tiles.slice(i + 1),
          ]),
        };
      })
      .filter(obj => obj.neighbors.length == 2)
      .reduce((acc, c) => acc * c.tileId, 1);
  };

  const rightBorder = data => data.map(l => l[l.length - 1]).join('');

  const leftBorder = data => data.map(l => l[0]).join('');

  const topBorder = data => data[0];

  const downBorder = data => data[data.length - 1];

  const searchNeighbor = (tile, map, func1, func2, flipFunc) => {
    let currentSide = func1(tile.data);
    for (let [key, value] of map.entries()) {
      let coords = [...value.data];

      for (let i = 0; i < 4; i++) {
        const side = func2(coords);
        if (currentSide === side) {
          return { id: key, data: coords };
        }
        const flipped = flip(side);
        if (currentSide === flipped) {
          return { id: key, data: flipFunc(coords) };
        }
        coords = rotate90(coords);
      }
    }
    currentSide = func2(tile.data);
    for (let [key, value] of map.entries()) {
      let coords = [...value.data];

      for (let i = 0; i < 4; i++) {
        const side = func2(coords);
        if (currentSide === side) {
          return { id: key, data: coords };
        }
        const flipped = flip(side);
        if (currentSide === flipped) {
          return { id: key, data: flipFunc(coords) };
        }
        coords = rotate90(coords);
      }
    }
    return null;
  };

  const searchHorizontalNeighbor = (tile, map) => {
    return searchNeighbor(tile, map, rightBorder, leftBorder, flipX);
  };

  const searchVerticalNeighbor = (tile, map) => {
    return searchNeighbor(tile, map, downBorder, topBorder, flipY);
  };

  const task2 = () => {
    const tiles = parseInput();

    const adjusted = tiles.map((tile, i) => {
      return {
        tile: tile,
        neighbors: getNeighbors(tile, [
          ...tiles.slice(0, i),
          ...tiles.slice(i + 1),
        ]),
      };
    });

    const corners = adjusted.filter(p => p.neighbors.length === 2);
    const nCorners = corners.map(it => {
      return { id: it.tile.tileId, data: it.tile.raw };
    });

    const c = nCorners[0];

    return processCorner(adjusted, c);
  };

  function processCorner(adjusted, corner) {
    const map = new Map();

    for (let element of adjusted) {
      const id = element.tile.tileId;
      const data = element.tile.raw;
      map.set(id, { id, data });
    }

    let start = {
      id: corner.id,
      data: flipY(rotate90(rotate90(rotate90(corner.data)))), // !!! adjust corner for my input!!!!!!
    };

    const rows = computeTileRows(map, start);

    printTileIDs(rows);
    printTileWithBorders(rows);

    removeBorders(rows);

    printBorderless(rows);

    let image = createImage(rows);

    printImage(image);

    let img = createModifiableImage(image);

    searchForMonster(img);

    printMonsterImage(img);

    return computeSymbols(img);
  }

  function computeSymbols(img) {
    let sum = 0;
    for (let line of img) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '#') sum += 1;
      }
    }
    return sum;
  }

  function searchForMonster(img) {
    const monster = [
      [18, 0],
      [0, 1],
      [5, 1],
      [6, 1],
      [11, 1],
      [12, 1],
      [17, 1],
      [18, 1],
      [19, 1],
      [1, 2],
      [4, 2],
      [7, 2],
      [10, 2],
      [13, 2],
      [16, 2],
    ];
    for (let i = 0; i < img.length; i++) {
      for (let j = 0; j < img.length; j++) {
        const newCoordinates = monster.map(it => [it[0] + i, it[1] + j]);

        const v = newCoordinates.every(pair => {
          return pair && img[pair[0]] && img[pair[0]][pair[1]] === '#';
        });
        if (v) {
          newCoordinates.forEach(pair => {
            img[pair[0]][pair[1]] = 'O';
          });
        }
      }
    }
  }

  function createModifiableImage(image) {
    let image2 = [];

    for (let line of image) {
      image2.push(line.split(''));
    }
    return image2;
  }

  function createImage(rows) {
    let image = [];
    let array = [[], [], [], [], [], [], [], []];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let element of row) {
        for (let k = 1; k < 9; k++) array[k - 1].push(element.data[k]);
      }
      for (let line of array) {
        image.push(line.join(''));
      }
      array = [[], [], [], [], [], [], [], []];
    }
    return image;
  }

  function computeTileRows(map, start) {
    map.delete(start.id);
    const rows = [];
    let r = [];
    r.push(start);

    // create tile image
    while (map.size > 0) {
      let last = r[r.length - 1];
      const neighbor = searchHorizontalNeighbor(last, map);
      if (neighbor) {
        map.delete(neighbor.id);
        r.push(neighbor);
      } else {
        rows.push(r);
        last = searchVerticalNeighbor(r[0], map);
        if (last) {
          r = [last];
          map.delete(last.id);
        }
      }
    }
    rows.push(r);
    return rows;
  }

  function printTileIDs(rows) {
    console.log('Tile IDs:');
    for (let row of rows) {
      console.log(row.map(it => it.id).join(' '));
    }
    console.log('');
  }

  function printTileWithBorders(rows) {
    console.log('Tiles with borders');
    let array = [[], [], [], [], [], [], [], [], [], []];
    for (let row of rows) {
      for (let element of row) {
        for (let k = 0; k < 10; k++) array[k].push(element.data[k]);
      }
      for (let line of array) {
        console.log(line.join(' '));
      }
      console.log('');
      array = [[], [], [], [], [], [], [], [], [], []];
    }
    console.log('');
  }

  function flipX(a) {
    const lines = [];
    for (let i = a.length - 1; i >= 0; i--) {
      const line = [];
      for (let j = 0; j < a.length; j++) {
        line.push(a[i][j]);
      }
      lines.push(line.join(''));
    }
    return lines;
  }

  function rotate90(a) {
    const lines = [[], [], [], [], [], [], [], [], [], []];
    for (let i = a.length - 1; i >= 0; i--) {
      const line = a[i];
      for (let j = 0; j < line.length; j++) {
        lines[j].push(a[i][j]);
      }
    }

    return lines.map(l => l.join(''));
  }

  function flipY(a) {
    const lines = [];
    for (let i = 0; i < a.length; i++) {
      const line = [];
      for (let j = a.length - 1; j >= 0; j--) {
        line.push(a[i][j]);
      }
      lines.push(line.join(''));
    }
    return lines;
  }

  function printBorderless(rows) {
    console.log('Remove borders');
    let array = [[], [], [], [], [], [], [], []];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let element of row) {
        for (let k = 1; k < 9; k++) array[k - 1].push(element.data[k]);
      }
      for (let line of array) {
        console.log(line.join(' '));
      }
      console.log('');
      array = [[], [], [], [], [], [], [], []];
    }
    console.log('');
  }

  function removeBorders(rows) {
    // remove borders
    for (let row of rows) {
      for (let element of row) {
        const newArray = [];
        const array = element.data;
        for (let i = 0; i < array.length - 1; i++) {
          const line = array[i];
          newArray.push(line.substring(1, line.length - 1));
        }
        element.data = newArray;
      }
    }
  }

  function printImage(image) {
    console.log('Image');
    for (let line of image) {
      console.log(line);
    }
    console.log();
  }

  function printMonsterImage(img) {
    console.log('Image with monsters');
    for (let line of img) {
      console.log(line.join(''));
    }
    console.log();
  }

  console.log(`Day 20: Jurassic Jigsaw 
Task 1: ${task1()}
Task 2: ${task2()} `);
};
console.time('Time:');
day20();
console.timeEnd('Time:');
