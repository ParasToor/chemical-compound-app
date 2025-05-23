const express = require("express");
const {
  getAllCompounds,
  updateCompound,
  deleteCompound,
  getCompound,
} = require("../controllers/compoundController");
const router = express.Router();

router
  .route("/compounds/:id")
  .get(getCompound)
  .patch(updateCompound)
  .delete(deleteCompound);

router.get("/compounds", getAllCompounds);


module.exports = router;
