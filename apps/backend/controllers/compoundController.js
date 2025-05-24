const Compound = require("../models/compounds");

const getCompound = async (req, res) => {
  try {
    const { id } = req.params;

    const compound = await Compound.findOne({ where: { id: id }, raw: true });

    if (!compound) {
      return res.status(404).json({
        success: "false",
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: "true",
      data: compound,
    });
  } catch (err) {
    console.log("Error in getCompound :", err);

    return res.status(500).json({
      success: "false",
      error: err.message || "Internal server error",
    });
  }
};

const deleteCompound = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await Compound.destroy({ where: { id: id } });

    if (!deleteData) {
      return res.status(404).json({
        success: "false",
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Data deleted successfully",
    });
  } catch (err) {
    console.log("Error in delete Compound handler :", err);

    return res.status(500).json({
      success: "false",
      message: err.message || "Internal server error",
    });
  }
};

const updateCompound = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const findExists = await Compound.findOne({
      where: { id: id },
    });

    if (!findExists) {
      return res.status(404).json({
        success: "false",
        message: "Data not found",
      });
    }

    const updatedData = await Compound.update(data, { where: { id: id } });

    return res.status(200).json({
      success: "true",
      message: "Data updated scuccessfully",
    });
  } catch (err) {
    console.log("Error in update compound handler :", err);

    return res.status(500).json({
      success: "false",
      error: err.message || "Internal server error",
    });
  }
};

const getAllCompounds = async (req, res) => {
  try {
    const data = await Compound.findAll({
      raw: true,
    });

    return res.status(200).json({
      success: "true",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      Error: err.message || "Internal server error",
    });
  }
};

// const createCompound = async (req, res) => {
//   try {
//     const data = req.body;

//     // console.log("request    ->", req.body);

//     const result = await Compound.create(data);

//     // console.log("result--->", result);

//     return res.status(200).json({
//       success: "true",
//       message: result,
//     });
//   } catch (err) {
//     console.log("Error in creation of compound  -", err);
//     return res.status(500).json({
//       success: "false",
//       message: err.message,
//     });
//   }
// };

module.exports = {
  getCompound,
  // createCompound,
  getAllCompounds,
  updateCompound,
  deleteCompound,
};
