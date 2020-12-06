export function collectNewLineSeparatedEntries(input) {
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