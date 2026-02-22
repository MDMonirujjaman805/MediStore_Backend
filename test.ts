// model User {
//   id        String     @id @default(uuid())
//   name      String
//   email     String     @unique
//   password  String
//   phone     String?
//   role      Role
//   status    UserStatus @default(ACTIVE)
//   createdAt DateTime   @default(now())
//   updatedAt DateTime   @updatedAt
//   medicines Medicine[] @relation("SellerMedicines")
//   orders    Order[]
//   reviews   Review[]

//   @@index([email, id])
//   @@map("user")
// }

// model Category {
//   id        String   @id @default(uuid())
//   name      String   @unique
//   createdAt DateTime @default(now())

//   medicines Medicine[]

//   @@index([name])
//   @@map("category")
// }

// model Medicine {
//   id           String   @id @default(uuid())
//   name         String
//   description  String
//   price        Float
//   stock        Int
//   manufacturer String
//   image        String?
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt

//   categoryId String
//   category   Category @relation(fields: [categoryId], references: [id])

//   sellerId String
//   seller   User   @relation("SellerMedicines", fields: [sellerId], references: [id])

//   reviews    Review[]
//   orderItems OrderItem[]

//   @@index([name, manufacturer])
//   @@map("medicine")
// }

// model Order {
//   id              String      @id @default(uuid())
//   totalAmount     Float
//   status          OrderStatus @default(PENDING)
//   shippingAddress String
//   createdAt       DateTime    @default(now())

//   customerId String
//   customer   User   @relation(fields: [customerId], references: [id])

//   items OrderItem[]

//   @@index([id, status])
//   @@map("order")
// }

// model OrderItem {
//   id       String @id @default(uuid())
//   quantity Int
//   price    Float

//   orderId String
//   order   Order  @relation(fields: [orderId], references: [id])

//   medicineId String
//   medicine   Medicine @relation(fields: [medicineId], references: [id])

//   @@index([id, orderId])
//   @@map("orderItem")
// }

// model Review {
//   id        String   @id @default(uuid())
//   rating    Int
//   comment   String
//   createdAt DateTime @default(now())

//   userId String
//   user   User   @relation(fields: [userId], references: [id])

//   medicineId String
//   medicine   Medicine @relation(fields: [medicineId], references: [id])

//   @@index([rating])
//   @@map("review")
// }