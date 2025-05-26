const { createSchema } = require("../../utils/schemaGenerator.js");

const validationSchemas = {
  createCompound: createSchema([
    {
      name: "name",
      validations: { type: "string", optional: true, min: 3 },
    },
    {
      name: "description",
      validations: { type: "string", optional: true },
    },
    {
      name: "image",
      validations: {
        type: "string",
        pattern: /^https?:\/\/.+\.(jpg|png|jpeg)$/i,
      },
      message: "Invalid image URL",
    },
  ]),
  updateCompound: createSchema([
    {
      name: "name",
      validations: { type: "string", optional: true, min: 3 },
    },
    {
      name: "description",
      validations: { type: "string", optional: true },
    },
    {
      name: "image",
      validations: {
        type: "string",
        pattern: /^https?:\/\/.+\.(jpg|png|jpeg)$/i,
      },
      message: "Invalid image URL",
    },
  ]),
};

const validationMiddleware = (schemaKey) => {
  return (req, res, next) => {
    const data =
      req.method === "GET" || req.method === "DELETE" ? req.query : req.body;
    const schema = validationSchemas[schemaKey];

    if (!schema) {
      console.log(`Validation schema for "${schemaKey}" not found`);
      return res.status(500).json({
        success: "flase",
        error: `Internal server error`,
      });
    }

    const { error } = schema.validate(data);

    if (error) {
      console.log("Error in scheam validator  -", error);

      let errorMessages = error.details.map((err) =>
        err.message.replace(/"/g, "")
      );

      return res.status(400).json({
        success: "false",
        error: errorMessages.join(","),
      });

      //   // return res.status(400).json({ error: errorMessages.join(", ") });
      //   let err = new Error(errorMessages.join(", "));
      //   err.status = 400;
      //   next(err);
    }
    next();
  };
};

module.exports = validationMiddleware;
