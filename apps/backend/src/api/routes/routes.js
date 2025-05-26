const express = require("express");
const {
  getAllCompounds,
  updateCompound,
  deleteCompound,
  getCompound,
  createCompound,
} = require("../controllers/compoundController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const router = express.Router();

router
  .route("/compounds/:id")
  .get(getCompound)
  .patch(validationMiddleware("updateCompound"), updateCompound)
  .delete(deleteCompound);

router.route("/compounds").post(createCompound).get(getAllCompounds);

module.exports = router;
