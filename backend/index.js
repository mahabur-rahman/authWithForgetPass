const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

const userRoute = require("./routes/user.route");

// connect to db
require("./db/conn");

app.use("/api/users", userRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
