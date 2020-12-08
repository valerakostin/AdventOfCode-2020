import { input } from './input.js'

const day8 = () => {
    const commands = parseCommands()

    function parseCommands() {
        return input.split('\n')
            .map(line => {
                const [command, operand] = line.split(' ')
                const parameter = +operand
                return { command, parameter }
            })
    }

    const executeProgramm = (program) => {
        let counter = 0
        let acc = 0
        const visited = new Set([])
        while (true) {
            if (counter === program.length) {
                return { acc: acc, terminated: true };
            }
            const c = program[counter];
            if (visited.has(counter))
                return { acc }

            visited.add(counter)
            if ('nop' === c.command) {
                counter++
            } else if ('acc' === c.command) {
                counter++;
                acc += c.parameter
            } else if ('jmp' === c.command) {
                counter = counter + c.parameter
            } else {
                console.log('Unknown command')
            }
        }
    }
    const task1 = () => {
        return executeProgramm(commands).acc
    }

    const task2 = () => {
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i].command
            if (command === 'nop' || command === 'jmp') {
                const oldCommand = commands[i]
                const newCommand = { command: oldCommand === 'nop' ? 'jmp' : 'nop', operand: oldCommand.operand }
                commands[i] = newCommand
                const result = executeProgramm(commands)
                commands[i] = oldCommand
                if (result.terminated)
                    return result.acc
            }
        }
    }

    console.log(`Day 8: Handheld Halting
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day8();