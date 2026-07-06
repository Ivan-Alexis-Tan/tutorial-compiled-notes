const today = new Date().toDateString()

export const studentTHeaders = ["id", "name", "marks", "created_at"]
export const studentsData = {
    1: [1, "Amir", 23, today],
    2: [2, "Piyush", 96, today],
    3: [3, "Riya", 86, today],
    4: [4, "Ram", 56, today],
    5: [5, "Shyam", 45, today],
    6: [6, "Preeti", 67, today],
    7: [7, "Priya", "[null]", today],
}

export function sliceDummyData(data, start = 0, end) {
    const sliced = Object.entries(data).slice(start, end)
    return Object.fromEntries(sliced)
}