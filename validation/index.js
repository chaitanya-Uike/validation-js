import numberValidation from "./number-validation";
import objectValidation from "./object-validation";
import stringValidation from "./string-validation";
import booleanValidation from "./boolean-validation";
import arrayValidation from "./array-validation";

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

export default validateSchema;
