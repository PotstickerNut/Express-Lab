const express = require("express");
const getData = require("./controllers/getData");
const students = require("./models/students");

const app = express();
const studentsData = getData();

const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Running middleware function!!!`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./views");

// home page
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Student Home Page",
    headerTitle: "Home Page",
  });
});

app.get("/events", (req, res) => {});

// list of all students
app.get("/students", (req, res) => {
  res.render("students", {
    data: studentsData,
    pageTitle: "Students Page",
    headerTitle: "Student Directory",
  });
});

// new student form
app.get("/students/new", (req, res) => {
  res.render("new-students", {
    pageTitle: "New Student",
    headerTitle: "Add New Student",
  });
});

// create new student
app.post("/students", (req, res) => {
  console.log(req.body);
  studentsData.push(req.body);
  res.redirect("/students");
});

// search by student ID
app.get("/students/:id", (req, res) => {
  const result = students.filter(
    (student) => student.id === Number(req.params.id)
  );
  res.send(result);
});

// search by full name
app.get("/students/search/:name", (req, res) => {
  const result = students.filter((student) => student.name === req.params.name);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
