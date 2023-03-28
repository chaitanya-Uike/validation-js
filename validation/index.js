import numberValidation from "./number-validation";
import objectValidation from "./object-validation";
import stringValidation from "./string-validation";
import booleanValidation from "./boolean-validation";
import arrayValidation from "./array-validation";
import build from "./build";

function validateSchema(data, schema) {
  const globalCtx = build(schema);
  return validate(data, schema, [], globalCtx);
}

function validate(data, schema, instancePath, globalCtx) {
  const path_ = [...instancePath, schema.name];

  if (schema.type === "object")
    return objectValidation(data, schema, path_, validate, globalCtx);
  else if (schema.type === "string")
    return stringValidation(data, schema, path_);
  else if (schema.type === "number")
    return numberValidation(data, schema, path_);
  else if (schema.type === "boolean")
    return booleanValidation(data, schema, path_);
  else if (schema.type === "array")
    return arrayValidation(data, schema, path_, validate, globalCtx);
  else if (schema.type === "local_ref") {
    const referencedSchema = globalCtx.$def[schema.ref_id];
    return validate(data, referencedSchema, path_, globalCtx);
  }
}

export default validateSchema;
