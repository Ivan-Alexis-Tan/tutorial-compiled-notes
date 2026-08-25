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

export const salesPerBrand = ordersTable2
    .reduce(
        (acc, order) => {
            const brandVal = acc.find(item => item.brand === order.brand)
            const sales = order.price * order.quantity

            if (brandVal) {
                const filtered = acc.filter(item => item.brand !== order.brand)
                return [
                    ...filtered,
                    {brand: brandVal.brand, total_sales: brandVal.total_sales + sales}
                ]
            }
            
            return [...acc, {brand: order.brand, total_sales: sales}]
        }, []
    )

export const customersTable3 = [
  { id: 1, name: "Juan Dela Cruz", city: "Cebu" },
  { id: 2, name: "Maria Santos", city: "Manila" },
  { id: 3, name: "Pedro Reyes", city: "Davao" },
  { id: 4, name: "Ana Garcia", city: "Cebu" },
  { id: 5, name: "Miguel Torres", city: "Iloilo" },
  { id: 6, name: "Sofia Mendoza", city: "Manila" },
  { id: 7, name: "Carlos Ramos", city: "Baguio" },
  { id: 8, name: "Elena Cruz", city: "Cebu" },
  { id: 9, name: "Daniel Flores", city: "Davao" },
  { id: 10, name: "Isabella Navarro", city: "Iloilo" }
];

export const ordersTable3 = [
  { id: 1, customer_id: 1, product: "Laptop", amount: 45000 },
  { id: 2, customer_id: 2, product: "Keyboard", amount: 2500 },
  { id: 3, customer_id: 1, product: "Mouse", amount: 1200 },
  { id: 4, customer_id: 3, product: "Monitor", amount: 12500 },
  { id: 5, customer_id: 4, product: "Headphones", amount: 2800 },
  { id: 6, customer_id: 2, product: "Laptop Stand", amount: 1800 },
  { id: 7, customer_id: 1, product: "Webcam", amount: 3200 },
  { id: 8, customer_id: 5, product: "Keyboard", amount: 2500 },
  { id: 9, customer_id: 3, product: "Mouse", amount: 1200 },
  { id: 10, customer_id: 6, product: "Laptop", amount: 45000 }
];

export const employeesTable = [
    {id: 1, name: "Amit", manager_id: null, department: "IT", salary: 80000},
    {id: 2, name: "Rahul", manager_id: 1, department: "IT", salary: 60000},
    {id: 3, name: "Neha", manager_id: 1, department: "IT", salary: 55000},
    {id: 4, name: "Karan", manager_id: 2, department: "HR", salary: 50000},
    {id: 5, name: "Pooja", manager_id: 2, department: "HR", salary: 48000},
    {id: 6, name: "Rohit", manager_id: 3, department: "Sales", salary: 45000},
]