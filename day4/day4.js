import { input } from './input.js'

const day4 = () => {

    const entries = collectEntries();
    const validFields = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:']
    const task1 = () => {
        
        return entries.filter(entry => validFields.every(f => entry.includes(f))
        ).length
    }
    const task2 = () => {
        let numOfVlaid = 0
        const hexChars = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'])
        const digits = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
        const eyeColor = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])

        const workSet = entries.filter(entry => validFields.every(f => entry.includes(f)))
        for (let entry of workSet) {
            let valid = true;
            const pass = entry.trim().split(' ')
            for (let entry of pass) {
                const [key, value] = entry.split(':')

                if (key === 'byr') {
                    const v = +value
                    if (v < 1920 || v > 2002) {
                        valid = false;
                        break;
                    }
                } else if (key === 'iyr') {
                    const v = +value
                    if (v < 2010 || v > 2020) {
                        valid = false;
                        break;
                    }
                }
                else if (key === 'eyr') {
                    const v = +value
                    if (v < 2020 || v > 2030) {
                        valid = false;
                        break;
                    }
                } else if (key === 'hgt') {
                    if (value.endsWith('cm')) {
                        const v = new Number(value.substring(0, value.length - 2))
                        if (v < 150 || v > 193) {
                            valid = false;
                            break;
                        }
                    }
                    else if (value.endsWith('in')) {
                        const v = new Number(value.substring(0, value.length - 2))
                        if (v < 59 || v > 76) {
                            valid = false;
                            break;
                        }
                    }
                    else {
                        valid = false;
                        break;
                    }
                } else if (key === 'hcl') {
                    if (!value.startsWith('#') || [...value.substring(1, value.length)].some(c => !hexChars.has(c))) {
                        valid = false;
                        break;
                    }
                } else if (key === 'ecl') {
                    if (!eyeColor.has(value)) {
                        valid = false;
                        break;
                    }
                } else if (key === 'pid') {
                    if (value.length != 9 || [...value].some(c => !digits.has(c))) {
                        valid = false;
                        break;
                    }
                }
            }

            if (valid) {
                numOfVlaid++;
            }
        }
        return numOfVlaid
    }

    function collectEntries() {
        const entries = [];
        let currentLine = ''
        const lines = input.split('\n');
        for (let line of lines) {
            if (line.trim() === '') {
                entries.push(currentLine);
                currentLine = '';
            }
            else {
                const str = line.trim();
                currentLine = currentLine + ' ' + str;
            }
        }
        // Last entry
        entries.push(currentLine);
        return entries;
    }

    console.log(`Day 4: Passport Processing
Task 1: ${task1()}
Task 2: ${task2()} `)
}

day4();



