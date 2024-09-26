const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = 3000;
const courses = require("../dcba/database/database");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  // console.log(course);
  // console.log(result); // { name: 'cherries', quantity: 5 }
  // console.log(courses[0].course);
  // console.log(courses[0]);
  res.render("index", { courses });
});

app.post("/api", (req, res) => {
  // console.log(req.body.choice);
  var fname = req.body.firstName;
  var lname = req.body.lastName;
  var email = req.body.email;
  var phone = req.body.phone;
  var result = courses.find(({ course }) => course === req.body.choice);

  switch (req.body.choice) {
    case "business-analysis":
      result = courses[0];
      break;
    case "data-analysis":
      result = courses[1];
      break;
    case "ui/ux-design":
      result = courses[2];
      break;
    case "digital-marketing":
      result = courses[3];
      break;
    default:
      break;
  }
  // console.log(result);
  res.render("partials/json", { result, fname, lname, email, phone });
});

app.listen(port, () => console.log(`Server is runnning at port ${port}`));
