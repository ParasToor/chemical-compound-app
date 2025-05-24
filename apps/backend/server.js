require("dotenv").config();
const importCSV = require("./config/inititaliseData");
const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const app = express();
const port = process.env.PORT;

// importCSV();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port - ${port}`);
});
