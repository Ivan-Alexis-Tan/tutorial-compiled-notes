export function capsEveryWord(string, split = " ", inBetween = " ") {
    const caps = `${string}`.split(split).map(s => s.charAt(0).toUpperCase() + s.slice(1))
    return caps.join(inBetween)
}