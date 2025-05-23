const Compound = require("../models/compounds");

const getCompound = async (req, res) => {
  try {
    const { id } = req.params;

    const compound = await Compound.findOne({ where: { id: id } });

    return res.status(200).json({
      success: "true",
      data: compound,
    });
  } catch (err) {
    console.log("Error in getCompound :", err);
    return req.status(500).json({
      success: "false",
      error: err,
    });
  }
};

const deleteCompound = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteData = await Compound.destroy({ where: { id: id } });

    if (!deleteData) {
      return res.status(400).json({
        success: "false",
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "data deleted successfully",
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(500).json({
      success: "false",
      message: "Internal server error",
    });
  }
};

const updateCompound = async (req, res) => {
  try {
    console.log("IN update request");
    const { id } = req.body;
    const data = req.body;

    console.log("data     ->", data);

    const findExists = await Compound.findOne({
      where: { id: id },
    });

    if (!findExists) {
      return res.status(400).json({
        success: "false",
        message: "Not found",
      });
    }

    const updatedData = await Compound.update(data, { where: { id: id } });

    return res.status(200).json({
      success: "true",
      message: "Data updated scuccessfully",
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(500).json({
      success: "false",
      error: err,
    });
  }
};

const getAllCompounds = async (req, res) => {
  try {
    const data = await Compound.findAll({
      raw: true,
    });
    console.log("data   ->", data);
    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      Error: err,
    });
  }
};

const createCompound = async (req, res) => {
  try {
    const data = req.body;

    // console.log("request    ->", req.body);

    const result = await Compound.create(data);

    // console.log("result--->", result);

    return res.status(200).json({
      success: "true",
      message: result,
    });
  } catch (err) {
    console.log("Error in creation of compound  -", err);
    return res.status(500).json({
      success: "false",
      message: err.message,
    });
  }
};

module.exports = {
  getCompound,
  createCompound,
  getAllCompounds,
  updateCompound,
  deleteCompound,
};
