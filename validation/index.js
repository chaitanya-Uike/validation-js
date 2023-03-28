const numberValidation = require("./number-validation");
const objectValidation = require("./object-validation");
const stringValidation = require("./string-validation");
const booleanValidation = require("./boolean-validation");
const arrayValidation = require("./array-validation");

function validateSchema(data, schema) {
  return validate(data, schema, []);
}

function validate(data, schema, instancePath) {
  const path_ = [...instancePath, schema.name];

  if (schema.type === "object")
    return objectValidation(data, schema, path_, validate);
  else if (schema.type === "string")
    return stringValidation(data, schema, path_);
  else if (schema.type === "number")
    return numberValidation(data, schema, path_);
  else if (schema.type === "boolean")
    return booleanValidation(data, schema, path_);
  else if (schema.type === "array")
    return arrayValidation(data, schema, path_, validate);
}

module.exports = validateSchema;
