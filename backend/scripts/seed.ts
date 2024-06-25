import { PrismaClient, Role, Gender } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash a common password for all users
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create multiple users
    const users = [
      { username: "admin", email: "admin@example.com", role: Role.ADMIN },
      {
        username: "student1",
        email: "student1@example.com",
        role: Role.STUDENT,
      },
      {
        username: "student2",
        email: "student2@example.com",
        role: Role.STUDENT,
      },
      {
        username: "teacher1",
        email: "teacher1@example.com",
        role: Role.TEACHER,
      },
      {
        username: "teacher2",
        email: "teacher2@example.com",
        role: Role.TEACHER,
      },
    ];

    const createdUsers = await Promise.all(
      users.map((user) =>
        prisma.user.create({
          data: {
            username: user.username,
            email: user.email,
            password: hashedPassword,
            role: user.role,
            verified: true,
          },
        })
      )
    );

    const [adminUser, studentUser1, studentUser2, teacherUser1, teacherUser2] =
      createdUsers;
    console.log("Users created:");

    // Create students
    const students = [
      {
        firstName: "John",
        middleName: "A",
        lastName: "Doe",
        gender: Gender.MALE,
        dateOfBirth: new Date("2005-08-24"),
        email: "student1@example.com",
        phoneNumber: "123-456-7890",
        address: "123 Main St",
        city: "Hometown",
        userId: studentUser1.id,
      },
      {
        firstName: "Jane",
        middleName: "C",
        lastName: "Roe",
        gender: Gender.FEMALE,
        dateOfBirth: new Date("2006-03-15"),
        email: "student2@example.com",
        phoneNumber: "987-654-3210",
        address: "456 Oak St",
        city: "Villagetown",
        userId: studentUser2.id,
      },
    ];

    const createdStudents = await Promise.all(
      students.map((student) => prisma.student.create({ data: student }))
    );
    console.log("Students created:");

    // Create teachers
    const teachers = [
      {
        firstName: "Jane",
        middleName: "B",
        lastName: "Smith",
        gender: Gender.FEMALE,
        dateOfBirth: new Date("1980-05-15"),
        email: "teacher1@example.com",
        phone: "987-654-3210",
        bio: "An experienced teacher in mathematics.",
        yearsOfExperience: 10,
        userId: teacherUser1.id,
      },
      {
        firstName: "Mark",
        middleName: "D",
        lastName: "Johnson",
        gender: Gender.MALE,
        dateOfBirth: new Date("1975-02-20"),
        email: "teacher2@example.com",
        phone: "321-654-0987",
        bio: "A seasoned teacher in science.",
        yearsOfExperience: 15,
        userId: teacherUser2.id,
      },
    ];

    const createdTeachers = await Promise.all(
      teachers.map((teacher) => prisma.teacher.create({ data: teacher }))
    );
    console.log("Teachers created:");

    // Create classes
    const classes = [
      { name: "Class 1", level: 1, description: "First grade class" },
      { name: "Class 2", level: 2, description: "Second grade class" },
    ];

    const createdClasses = await Promise.all(
      classes.map((cls) => prisma.class.create({ data: cls }))
    );
    console.log("Classes created:");

    // Assign students to classes
    const updatedStudents = await Promise.all(
      createdStudents.map((student, index) =>
        prisma.student.update({
          where: { id: student.id },
          data: {
            class: {
              connect: { id: createdClasses[index % createdClasses.length].id },
            },
          },
        })
      )
    );
    console.log("Students assigned to classes:");

    // Create subjects
    const subjects = [
      {
        name: "Mathematics",
        description: "Basic Mathematics",
        classId: createdClasses[0].id,
      },
      {
        name: "Science",
        description: "Basic Science",
        classId: createdClasses[1].id,
      },
    ];

    const createdSubjects = await Promise.all(
      subjects.map((subject) => prisma.subject.create({ data: subject }))
    );
    console.log("Subjects created:");

    // Assign teachers to subjects
    const updatedSubjects = await Promise.all(
      createdSubjects.map((subject, index) =>
        prisma.subject.update({
          where: { id: subject.id },
          data: {
            teacher: {
              connect: {
                id: createdTeachers[index % createdTeachers.length].id,
              },
            },
          },
        })
      )
    );
    console.log("Teachers assigned to subjects:");

    // Create semesters
    const semesters = [
      {
        term: 1,
        year: 2024,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-30"),
      },
      {
        term: 2,
        year: 2024,
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-12-31"),
      },
    ];

    const createdSemesters = await Promise.all(
      semesters.map((semester) => prisma.semester.create({ data: semester }))
    );
    console.log("Semesters created:");

    // Create enrollments
    const enrollments = [
      {
        studentId: createdStudents[0].id,
        subjectId: createdSubjects[0].id,
        semesterId: createdSemesters[0].id,
      },
      {
        studentId: createdStudents[1].id,
        subjectId: createdSubjects[1].id,
        semesterId: createdSemesters[1].id,
      },
    ];

    const createdEnrollments = await Promise.all(
      enrollments.map((enrollment) =>
        prisma.enrollment.create({ data: enrollment })
      )
    );
    console.log("Enrollments created:");

    // Create grades
    const grades = [
      {
        value: 95,
        studentId: createdStudents[0].id,
        subjectId: createdSubjects[0].id,
        semesterId: createdSemesters[0].id,
      },
      {
        value: 88,
        studentId: createdStudents[1].id,
        subjectId: createdSubjects[1].id,
        semesterId: createdSemesters[1].id,
      },
    ];

    const createdGrades = await Promise.all(
      grades.map((grade) => prisma.grade.create({ data: grade }))
    );
    console.log("Grades created:");

    // Create attendance records
    const attendances = [
      {
        studentId: createdStudents[0].id,
        classId: createdClasses[0].id,
        date: new Date("2024-02-01"),
        status: "PRESENT",
      },
      {
        studentId: createdStudents[1].id,
        classId: createdClasses[1].id,
        date: new Date("2024-02-01"),
        status: "PRESENT",
      },
    ];

    const createdAttendances = await Promise.all(
      attendances.map((attendance) =>
        prisma.attendance.create({ data: attendance })
      )
    );
    console.log("Attendance records created:");

    // Create schedules
    const schedules = [
      {
        dayOfWeek: "Monday",
        startTime: new Date("2024-02-01T08:00:00Z"),
        endTime: new Date("2024-02-01T09:00:00Z"),
        classId: createdClasses[0].id,
        subjectId: createdSubjects[0].id,
        semesterId: createdSemesters[0].id,
      },
      {
        dayOfWeek: "Tuesday",
        startTime: new Date("2024-02-02T09:00:00Z"),
        endTime: new Date("2024-02-02T10:00:00Z"),
        classId: createdClasses[1].id,
        subjectId: createdSubjects[1].id,
        semesterId: createdSemesters[1].id,
      },
    ];

    const createdSchedules = await Promise.all(
      schedules.map((schedule) => prisma.schedule.create({ data: schedule }))
    );
    console.log("Schedules created:");

    // Assign teachers to classes
    const classTeachers = [
      {
        classId: createdClasses[0].id,
        teacherId: createdTeachers[0].id,
      },
      {
        classId: createdClasses[1].id,
        teacherId: createdTeachers[1].id,
      },
    ];

    const createdClassTeachers = await Promise.all(
      classTeachers.map((classTeacher) =>
        prisma.classTeacher.create({ data: classTeacher })
      )
    );
    console.log("Teachers assigned to classes:");
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
