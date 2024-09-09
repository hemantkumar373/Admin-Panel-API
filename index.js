const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const projectRoutes = require("./routes/projectRoutes.js");
const auditRoutes = require("./routes/auditRoutes.js");
const roleRoutes = require("./routes/roleRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/", authRoutes);
app.use("/project/", projectRoutes);
app.use("/", roleRoutes);
app.use("/users", userRoutes);
app.use("/users/", auditRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Admin Panel API");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
