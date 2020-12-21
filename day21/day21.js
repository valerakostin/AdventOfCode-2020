import { input } from './input.js';

const day21 = () => {
  const parseInput = () => {
    const array = [];
    const lines = input.split('\n');
    for (let line of lines) {
      const index = line.indexOf('(');
      const ingredients = line.substring(0, index).trim().split(' ');
      const allergens = line
        .substring(index + 'contains'.length + 2, line.length - 1)
        .split(', ');

      array.push({ ingredients, allergens });
    }
    return array;
  };

  const computeInvertMapping = array => {
    const map = new Map();

    for (let line of array) {
      const { ingredients, allergens } = line;

      for (let allergen of allergens) {
        if (map.has(allergen)) {
          map.get(allergen).push(ingredients);
        } else {
          map.set(allergen, [ingredients]);
        }
      }
    }
    return map;
  };

  const getIngredient = histogram => {
    for (let [key, value] of histogram.entries()) {
      if (value.size == 1) {
        for (let ingredient of value.keys()) {
          return { ingredient, allergen: key };
        }
        const ingredient = [value.keys()][0];
        return { ingredient: ingredient, allergen: key };
      }
    }
    return null;
  };

  const computeHistogram = mapping => {
    const histogram = new Map();
    for (let [key, values] of mapping.entries()) {
      const localMap = new Map();
      // compute histogram
      for (let value of values) {
        for (let ing of value) {
          const v = localMap.has(ing) ? localMap.get(ing) : 0;
          localMap.set(ing, v + 1);
        }
      }
      // remove not irrelevant components
      const map = new Map();
      const valuesCount = values.length;
      for (let [key, count] of localMap.entries()) {
        if (count === valuesCount) map.set(key, count);
      }

      histogram.set(key, map);
    }
    return histogram;
  };

  const solvePuzzle = () => {
    const array = parseInput();
    const mapping = computeInvertMapping(array);

    const histogram = computeHistogram(mapping);

    let allergenData = getIngredient(histogram);

    const knownElements = [];
    while (allergenData) {
      knownElements.push(allergenData);
      histogram.delete(allergenData.allergen);
      for (let v of histogram.values()) {
        v.delete(allergenData.ingredient);
      }
      allergenData = getIngredient(histogram);
    }

    const knownIngredients = new Set(knownElements.map(it => it.ingredient));

    let part1 = 0;
    for (let data of array) {
      const ingredients = data.ingredients;
      for (let ingredient of ingredients) {
        if (!knownIngredients.has(ingredient)) part1 += 1;
      }
    }

    const part2 = knownElements
      .sort((a, b) => a.allergen > b.allergen)
      .map(it => it.ingredient)
      .join(',');
    return { part1, part2 };
  };

  const { part1, part2 } = solvePuzzle();
  console.log(`Day 21: Allergen Assessment
Task 1: ${part1}
Task 2: ${part2} `);
};
day21();
