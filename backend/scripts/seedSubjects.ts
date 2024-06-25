import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Fetch existing classes to link subjects to them
    const classes = await prisma.class.findMany();

    if (classes.length === 0) {
      console.error("No classes found. Please seed classes first.");
      process.exit(1);
    }

    // Define a set of common subjects
    const subjectNames = [
      "Mathematics",
      "Science",
      "History",
      "English",
      "Physical Education",
      "Art",
      "Music",
      "Computer Science",
    ];

    // Create subjects for each class
    const subjects = classes.flatMap((cls) => {
      return subjectNames.map((name) => ({
        name: `${name} for ${cls.name}`,
        description: `${name} description for ${cls.name}`,
        classId: cls.id,
      }));
    });

    // Create subjects
    const createdSubjects = await Promise.all(
      subjects.map((subject) => prisma.subject.create({ data: subject }))
    );

    console.log("Subjects created:", createdSubjects);
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
