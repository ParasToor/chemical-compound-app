require("dotenv").config();
const importCSV = require("./config/inititaliseData");
const express = require("express");
const router = require("./routes/routes");
const app = express();
const port = process.env.PORT;

// importCSV();

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Listening on port - ${port}`);
});
