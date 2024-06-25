import React, { useState } from 'react';

interface Student {
  name: string;
  class: string;
}

interface Exam {
  name: string;
  date: string;
  duration: string;
  class: string;
}

interface ExamsAndMarksProps {
  students: Student[];
  exams: Exam[];
  marks: Record<string, number>; // Assuming marks are associated with some kind of identifier
}

const ExamsAndMarks: React.FC<ExamsAndMarksProps> = ({ students, exams, marks }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const uniqueClasses = [...new Set(students.map((student) => student.class))];
  const uniqueExams = [...new Set(exams.map((exam) => exam.name))];

  const filteredExams = exams.filter(
    (exam) =>
      (!selectedClass || exam.class === selectedClass) &&
      (!selectedExam || exam.name === selectedExam)
  );

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Exams and Marks</h2>
      {students.length > 0 ? (
        <div>
          <div className="mb-4">
            <label htmlFor="classFilter" className="mr-2">
              Filter :
            </label>
            <select
              id="classFilter"
              onChange={(e) => setSelectedClass(e.target.value)}
              value={selectedClass || ''}
              className="p-2 border rounded-md mr-4"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>

            <label htmlFor="examFilter" className="mr-2">
            {/* exam */}
            </label>
            <select
              id="examFilter"
              onChange={(e) => setSelectedExam(e.target.value)}
              value={selectedExam || ''}
              className="p-2 border rounded-md"
            >
              <option value="">All Exams</option>
              {uniqueExams.map((examItem) => (
                <option key={examItem} value={examItem}>
                  {examItem}
                </option>
              ))}
            </select>
          </div>
          {filteredExams.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Name student</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Class</th>
                  <th className="py-2">Marks</th>
                  <th className="py-2">Exam name</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam, index) => {
                  const student = students.find((s) => s.class === exam.class);
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-semibold">{student?.name || 'Unknown'}</td>
                      <td className="py-2">{exam.date}</td>
                      <td className="py-2">{exam.class}</td>
                      <td className="py-2">{marks[exam.name] || 'Not available'}</td>
                      <td className="py-2">{exam.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No exams available for the selected class and exam.</p>
          )}
        </div>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default ExamsAndMarks;