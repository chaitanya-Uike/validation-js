import numberValidation from "./types/number";
import objectValidation from "./types/object";
import stringValidation from "./types/string";
import booleanValidation from "./types/boolean";
import arrayValidation from "./types/array";
import build from "./build";

function validateSchema(data, schema) {
  const globalCtx = build(schema);
  return validate(data, schema, [], globalCtx);
}

function validate(data, schema, instancePath, globalCtx) {
  const path_ = [...instancePath, schema.name];

  switch (schema.type) {
    case "object":
      return objectValidation(data, schema, path_, validate, globalCtx);
    case "string":
      return stringValidation(data, schema, path_);
    case "number":
      return numberValidation(data, schema, path_);
    case "boolean":
      return booleanValidation(data, schema, path_);
    case "array":
      return arrayValidation(data, schema, path_, validate, globalCtx);
    case "local_ref": {
      const referencedSchema = globalCtx.$def[schema.ref_id];
      return validate(data, referencedSchema, path_, globalCtx);
    }
  }
}

export default validateSchema;
