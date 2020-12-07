import { input } from './input.js'

const day7 = () => {
    const SHINY_GOLD = 'shiny gold'
   
    const map = computeBagMap()

    function computeBagMap() {
        const map = new Map()

        input.split('\n')
            .map(line => {
                const index = line.indexOf('contain')
                const parent = line.substring(0, index - ' bags '.length)

                const children = [];
                if (!line.endsWith('no other bags.')) {
                    const valueLine = line.substring(index + ' contain'.length)
                    const components = valueLine.split(',')
                    for (let component of components) {
                        component = component.trim()
                        const [count, color1, color2] = component.split(' ')
                        children.push({ count: +count, color: color1 + ' ' + color2 })
                    }
                }
                map.set(parent, children);
            })
        return map;
    }

    function collectAllParents(color, map, allParents) {
        const parents = map.get(color)
        if (parents) {
            for (let parent of parents) {
                allParents.add(parent);
                collectAllParents(parent, map, allParents);
            }
        }
    }

    function collectNestedBags(color, map) {
        let sum = 0
        const children = map.get(color)
        if (children) {
            for (let child of children)
                sum += child.count + (child.count * collectNestedBags(child.color, map))
        }
        return sum;
    }

    const task1 = () => {
        const childParentMap = new Map()
        for (let [parent, children] of map) {
            for (let child of children) {
                const parents = childParentMap.get(child.color)
                if (parents)
                    parents.push(parent)
                else
                    childParentMap.set(child.color, [parent])
            }
        }

        const allParents = new Set()
        collectAllParents(SHINY_GOLD, childParentMap, allParents)

        return allParents.size
    }

    const task2 = () => {
        return collectNestedBags(SHINY_GOLD, map)
    }

    console.log(`Day 7: Handy Haversacks
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day7();

