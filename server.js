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

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Student Home Page",
    headerTitle: "Home Page",
  });
});

app.get("/students", (req, res) => {
  res.render("students", {
    data: studentsData,
    pageTitle: "Students Page",
    headerTitle: "Student Data",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
