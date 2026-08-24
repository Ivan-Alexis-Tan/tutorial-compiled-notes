const today = new Date().toDateString()

export const studentsData = [
    mapStudentData(1, "Amir", 23, today),
    mapStudentData(2, "Piyush", 96, today),
    mapStudentData(3, "Riya", 86, today),
    mapStudentData(4, "Ram", 56, today),
    mapStudentData(5, "Shyam", 45, today),
    mapStudentData(6, "Preeti", 67, today),
    mapStudentData(7, "Priya", null, today),
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

export const jrLevels = [7, 8, 9, 10]
export const genders = ["Male", "Female"]

export const fullStudentsData = [
    ...studentsData.map((student, idx) => ({
        ...student, 
        grade_level: jrLevels[idx % 4],
        gender: genders[idx % 2],
    })),
    ...studentData2
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

export const ordersTable2 = [
  { id: 1, item_name: "Laptop",   category: "Electronics", brand: "Lenovo",   price: 45000, quantity: 2 },
  { id: 2, item_name: "Keyboard", category: "Electronics", brand: "Logitech", price: 2500,  quantity: 5 },
  { id: 3, item_name: "Mouse",    category: "Electronics", brand: "Logitech", price: 1200,  quantity: 8 },
  { id: 4, item_name: "Monitor",  category: "Electronics", brand: "Samsung",  price: 12500, quantity: 3 },

  { id: 5, item_name: "Notebook", category: "Stationery",  brand: "Moleskine", price: 350, quantity: 12 },
  { id: 6, item_name: "Pen",      category: "Stationery",  brand: "Pilot",     price: 80,  quantity: 25 },
  { id: 7, item_name: "Marker",   category: "Stationery",  brand: "Pilot",     price: 120, quantity: 15 },
  { id: 8, item_name: "Folder",   category: "Stationery",  brand: "Kokuyo",    price: 150, quantity: 20 },

  { id: 9,  item_name: "Desk",    category: "Furniture",   brand: "IKEA",      price: 8500, quantity: 3 },
  { id: 10, item_name: "Chair",   category: "Furniture",   brand: "IKEA",      price: 4500, quantity: 6 },
  { id: 11, item_name: "Cabinet", category: "Furniture",   brand: "IKEA",      price: 7000, quantity: 4 },
  { id: 12, item_name: "Shelf",   category: "Furniture",   brand: "IKEA",      price: 5500, quantity: 5 }
]

export function mapOrdersTable2(id, item_name, price, quantity) {
    return {id, item_name, category, brand, price, quantity}
}