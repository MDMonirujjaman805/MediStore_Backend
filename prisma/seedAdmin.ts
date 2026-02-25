import { Role, UserStatus } from "../generated/prisma/enums";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    const admin = await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL! },
      update: {},
      create: {
        name: process.env.ADMIN_NAME!,
        email: process.env.ADMIN_EMAIL!,
        password: hashedPassword,
        phone: process.env.ADMIN_PHONE!,
        role: Role.ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    console.log("✅ Admin seeded:", admin);
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
