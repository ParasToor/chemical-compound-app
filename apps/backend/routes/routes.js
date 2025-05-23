const express = require("express");
const {
  createCompound,
  getAllCompounds,
  updateCompound,
  deleteCompound,
  getCompound,
} = require("../controllers/compoundController");
const router = express.Router();

router.get("/compounds/:id", getCompound);

router
  .route("/compounds")
  .get(getAllCompounds)
  .post(createCompound)
  .patch(updateCompound)
  .delete(deleteCompound);

module.exports = router;
