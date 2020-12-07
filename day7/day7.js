import { input } from './input.js'

const day7 = () => {
    const SHINY_GOLD = 'shiny gold'
    const task1 = () => {
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
                for (let child of children) {
                    const parents = map.get(child.color)
                    if (parents)
                        parents.push(parent)
                    else
                        map.set(child.color, [parent])
                }
            })

        const allParents = new Set()
        collectAllParents(SHINY_GOLD, map, allParents)
        return allParents.size
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

    const task2 = () => {
    }

    console.log(`Day 7: Handy Haversacks
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day7();