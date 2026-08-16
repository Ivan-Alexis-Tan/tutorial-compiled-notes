const today = new Date().toDateString()

export const studentsData = [
    mapStudentData(1, "Amir", 23, today),
    mapStudentData(2, "Piyush", 96, today),
    mapStudentData(3, "Riya", 86, today),
    mapStudentData(4, "Ram", 56, today),
    mapStudentData(5, "Shyam", 45, today),
    mapStudentData(6, "Preeti", 67, today),
    mapStudentData(7, "Priya", "[null]", today),
]
export const studentTHeaders = Object.keys(studentsData[0])

export function sliceDummyData(data, start = 0, end) {
    const sliced = Object.entries(data).slice(start, end)
    return Object.fromEntries(sliced)
}

export function mapStudentData(id, name, marks, createdAt) {
    return { id, name, marks, created_at: createdAt }
} 