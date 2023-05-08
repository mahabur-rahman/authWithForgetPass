const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

const userRoute = require("./routes/user.route");

// connect to db
require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
