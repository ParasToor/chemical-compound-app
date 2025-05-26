const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");
const sequelize = require("./database");
const Compound = require("../models/compounds");

async function importCSV() {
  try {
    const filePath = path.join(__dirname, "./compound.csv");
    const csvFile = fs.readFileSync(filePath, "utf8");
    const { data } = Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
    });

    const transformedData = data.map((row) => ({
      name: row.CompoundName,
      description: row.CompounrDescription,
      image: row.strImageSource,
    }));

    await Compound.bulkCreate(transformedData);
    // console.log("Parsed the daata - ", transformedData);
  } catch (err) {
    console.log("Error in parsing the csv file - ", err);
  }
}

module.exports = importCSV;
