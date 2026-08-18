export function capsEveryWord(string, split = " ", inBetween = " ") {
    const caps = `${string}`.split(split).map(s => s.charAt(0).toUpperCase() + s.slice(1))
    return caps.join(inBetween)
}

export function capitalize(string, splitBy = " ", joinBy = " ") {
    const splitted = `${string}`.split(splitBy)
    return splitted[0].charAt(0).toUpperCase() + splitted.join(joinBy).slice(1)
}

export function highlightActive(id, currId) {
    const baseStyle = `hover:bg-black`

    if (currId === id) {
        return baseStyle + " bg-black text-(--link-hover-bg-clr)"
    }
    return baseStyle
}