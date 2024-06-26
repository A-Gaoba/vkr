import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import users from "./routes/users";
import { students } from "./routes/students";
import { teachers } from "./routes/teachers";
import classes from "./routes/class";
import subjects from "./routes/subject";
import { semesters } from "./routes/semester";
import grades from "./routes/grade";
import enrollments from "./routes/enrollment";
import attendances from "./routes/attendance";
import schedule from "./routes/schedule";
import assignmentsRouter from "./routes/assignments";
import graduateStudent from "./routes/graduateStudent";

const app = express();
const PORT = 80;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", users);
app.use("/students", students);
app.use("/teachers", teachers);
app.use("/classes", classes);
app.use("/classes", classes);
app.use("/subjects", subjects);
app.use("/semesters", semesters);
app.use("/grades", grades);
app.use("/enrollments", enrollments);
app.use("/attendances", attendances);
app.use("/schedules", schedule);
app.use("/assign-teachers", assignmentsRouter);
app.use("/graduated-students", graduateStudent);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
