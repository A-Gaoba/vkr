import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.attendance.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.semester.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.classTeacher.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Deleted all existing data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
