const Joi = require("joi");
const typeMapping = {
  string: Joi.string,
  number: Joi.number,
  boolean: Joi.boolean,
  date: Joi.date,
  array: Joi.array,
  object: Joi.object,
};

const createSchema = (fields) => {
  const schema = {};

  fields.forEach((field) => {
    const { name, validations, conditional, message } = field;
    // Initialize with Joi type
    // schema[name] = Joi[validations.type](...validations.args || []);
    if (Array.isArray(validations.type)) {
      // Allow multiple types (e.g., ["string", "array"])
      const types = validations.type.map((t) => typeMapping[t]());
      if (validations.type.includes("array") && validations.items) {
        const arrayType = Joi.array().items(
          typeMapping[validations.items.type]()
        );
        schema[name] = Joi.alternatives().try(typeMapping.string(), arrayType);
      } else {
        schema[name] = Joi.alternatives().try(...types);
      }
    } else {
      // Single type
      schema[name] = Joi[validations.type](...(validations.args || []));
    }

    if (!schema[name]) {
      throw new Error(`Invalid type provided for field: ${name}`);
    }

    // Add additional validations
    if (validations.required) {
      schema[name] = schema[name].required();
    }
    if (validations.optional) {
      schema[name] = schema[name].optional();
    }
    if (validations.min) {
      schema[name] = schema[name].min(validations.min);
    }
    if (validations.max) {
      schema[name] = schema[name].max(validations.max);
    }
    if (validations.email) {
      schema[name] = schema[name].email();
    }
    if (validations.valid) {
      schema[name] = schema[name].valid(...validations.valid);
    }
    if (validations.pattern) {
      schema[name] = schema[name]
        .pattern(validations.pattern)
        .messages({ "string.pattern.base": message });
    }
    if (validations.custom) {
      schema[name] = schema[name].custom(validations.custom);
    }

    if (conditional) {
      const { field: conditionField, is, then, otherwise } = conditional;

      schema[name] = schema[name].when(conditionField, {
        is: is,
        then: Joi[then](),
        otherwise: Joi[otherwise](),
      });
    }
  });

  return Joi.object(schema);
};

module.exports = {
  createSchema,
};
