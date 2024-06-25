import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create classes
    const classes = Array.from({ length: 12 }, (_, i) => ({
      name: `Class ${i + 1}`,
      level: i + 1,
      description: `Class for grade ${i + 1}`,
    }));

    const createdClasses = await Promise.all(
      classes.map((cls) => prisma.class.create({ data: cls }))
    );
    console.log("Classes created:", createdClasses);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error("Main function error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
