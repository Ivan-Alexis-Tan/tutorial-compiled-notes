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

export function sliceDummyData(data, start = 0, end) {
    const sliced = Object.entries(data).slice(start, end)
    return Object.fromEntries(sliced)
}

export function mapStudentData(id, name, marks, createdAt) {
    return { id, name, marks, created_at: createdAt }
}

export const studentData2 = [
  { id: 8,  name: 'Amir',    marks: 23, created_at: today, grade_level: 7,  gender: 'Male' },
  { id: 9,  name: 'Sophia',  marks: 87, created_at: today, grade_level: 8,  gender: 'Female' },
  { id: 10, name: 'Liam',    marks: 74, created_at: today, grade_level: 9,  gender: 'Male' },
  { id: 11, name: 'Maya',    marks: 91, created_at: today, grade_level: 10, gender: 'Female' },
  { id: 12, name: 'Ethan',   marks: 68, created_at: today, grade_level: 7,  gender: 'Male' },
  { id: 13, name: 'Chloe',   marks: 82, created_at: today, grade_level: 8,  gender: 'Female' },
  { id: 14, name: 'Noah',    marks: 95, created_at: today, grade_level: 9,  gender: 'Male' },
  { id: 15, name: 'Emma',    marks: 76, created_at: today, grade_level: 10, gender: 'Female' },
  { id: 16, name: 'Lucas',   marks: 59, created_at: today, grade_level: 7,  gender: 'Male' },
  { id: 17, name: 'Olivia',  marks: 88, created_at: today, grade_level: 8,  gender: 'Female' },
]

export function mapCustomersTable(id, lastName, firstName, age) {
    return { id, last_name: lastName, first_name: firstName, age }
}

export const customersTable = [
    mapCustomersTable(1, "Dela Cruz", "Juan", 30),
    mapCustomersTable(2, "Tanaka", "Taro", 23),
    mapCustomersTable(3, "Smith", "John", 20),
]

export function mapOrdersTable(id, orderNumber, customerId) {
    return {id, order_number: orderNumber, customer_id: customerId}
}

export const ordersTable = [
    mapOrdersTable(1, 77895, 3),
    mapOrdersTable(2, 44678, 3),
    mapOrdersTable(3, 22456, 2),
    mapOrdersTable(4, 24562, 1),
]

