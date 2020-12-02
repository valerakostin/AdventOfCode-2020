import { input } from './input.js'

const day2 = () => {
    const data = input.split('\n').
        map(line => line.split(' ')).
        map(rawData => {
            const [rawInterval, rawChar, password] = rawData
            const index = rawInterval.indexOf('-');
            const low = +rawInterval.substring(0, index);
            const high = +rawInterval.substring(index + 1);
            const symbol = rawChar.substring(0, 1);

            return { low, high, symbol, password }
        })

    const task1 = () => {
        return data.reduce((acc, obj) => {
            const numOfSymbols = [...obj.password]
            .reduce((charCount, c) => c == obj.symbol ? charCount + 1 : charCount, 0)
            
            return numOfSymbols >= obj.low && numOfSymbols <= obj.high ? acc + 1 : acc
        }, 0)
    }

    const task2 = () => {
        return data.reduce((acc, obj) => {
            const first = obj.password[obj.low - 1] === obj.symbol
            const second = obj.password.length > obj.high - 1 && obj.password[obj.high - 1] === obj.symbol
            return first !== second ? acc + 1 : acc
        }, 0)
    }


    console.log(`Day2:
Task 1: ${task1()}
Task 2: ${task2()} 
`)
}
day2();