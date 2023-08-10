const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

// Add middleware to parse request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Define the array of web project items
const webProjects = [
  {
    id: 1,
    title: "React Game!",
    description: "Tic tac toe game created using Create React app.",
    URL: "http://heroku/myapp/game/",
  },
  {
    id: 2,
    title: "Online store",
    description: "Online store created with HTML, CSS and JavaScript.",
    URL: "https://git.com/myrepos/shop/index",
  },
];

// Define a route to return the array of web project items
app.get("/api", (req, res) => {
  res.send(webProjects);
});

let latestId = webProjects.reduce(
  (acc, project) => Math.max(acc, project.id),
  0
);

// Define a route to add a new web project item
app.post("/api", (req, res) => {
  const newWebProject = req.body;
  latestId++;
  newWebProject.id = latestId;
  webProjects.push(newWebProject);
  res.send("New web project added.");
});

// Define a route to delete a web project item by its ID
app.delete("/api/:id", (req, res) => {
  const id = req.params.id;
  const index = webProjects.findIndex((webProject) => webProject.id == id);
  if (index !== -1) {
    webProjects.splice(index, 1);
    res.send("Web project deleted.");
  } else {
    res.send("Web project not found.");
  }
});

// Define a route to update a web project item by its ID
app.put("/api/:id", (req, res) => {
  const id = req.params.id;
  const index = webProjects.findIndex((webProject) => webProject.id == id);
  if (index !== -1) {
    const updatedWebProject = req.body;
    webProjects[index] = { ...webProjects[index], ...updatedWebProject };
    res.send("Web project updated.");
  } else {
    res.send("Web project not found.");
  }
});

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
