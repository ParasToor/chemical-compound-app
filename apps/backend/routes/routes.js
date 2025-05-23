const express = require("express");
const router = express.Router();

router.route("/compounds").get((req, res, next) => {
  return res.status(200).json({
    message: "the routes are working correctly",
  });
});

module.exports = router;