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

    // Define a set of subjects for primary, lower secondary, and upper secondary education
    const primarySubjects = [
      "Quran",
      "Islamic Education",
      "Arabic",
      "Science",
      "History",
    ];

    const lowerSecondarySubjects = [
      "Quran",
      "Islamic Education",
      "Arabic",
      "Science",
      "History",
      "English",
    ];

    const upperSecondarySubjects = [
      "Quran",
      "Islamic Education",
      "Arabic",
      "Biology",
      "Chemistry",
      "Physics",
      "English",
    ];

    // Function to create semesters and subjects
    const createSemestersAndSubjects = async (classLevel, subjects) => {
      const terms = [1, 2];
      const createdSemestersAndSubjects = [];

      const createdClass = createdClasses[classLevel - 1];
      const baseYear = 2024; // Adjust the base year as necessary

      for (const term of terms) {
        const year = baseYear + classLevel - 1; // Ensure unique year for each class

        const semester = await prisma.semester.create({
          data: {
            term,
            year,
            startDate: new Date(
              `${year}-${term === 1 ? "01" : "07"}-01T00:00:00.000Z`
            ),
            endDate: new Date(
              `${year}-${term === 1 ? "06" : "12"}-30T00:00:00.000Z`
            ),
            semesterClasses: {
              create: { classId: createdClass.id },
            },
          },
        });

        const subjectEntries = subjects.map((name) => ({
          name: `${name} for ${createdClass.name} Semester ${term}`,
          description: `${name} description for ${createdClass.name} Semester ${term}`,
          classId: createdClass.id,
          semesterSubjects: {
            create: { semesterId: semester.id },
          },
        }));

        const createdSubjects = await Promise.all(
          subjectEntries.map((subject) =>
            prisma.subject.create({
              data: subject,
            })
          )
        );

        createdSemestersAndSubjects.push({
          semester,
          subjects: createdSubjects,
        });
      }

      return createdSemestersAndSubjects;
    };

    // Assign subjects to primary, lower secondary, and upper secondary classes
    for (let classIndex = 1; classIndex <= 12; classIndex++) {
      if (classIndex <= 6) {
        // Primary education
        await createSemestersAndSubjects(classIndex, primarySubjects);
      } else if (classIndex <= 9) {
        // Lower secondary education
        await createSemestersAndSubjects(classIndex, lowerSecondarySubjects);
      } else {
        // Upper secondary education
        await createSemestersAndSubjects(classIndex, upperSecondarySubjects);
      }
    }

    console.log("Semesters and subjects created for each class and term:");
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
