import numberValidation from "./types/number";
import objectValidation from "./types/object";
import stringValidation from "./types/string";
import booleanValidation from "./types/boolean";
import arrayValidation from "./types/array";
import compositionValidation from "./types/compostion";
import build from "./build";

function validateSchema(data, schema) {
  const globalCtx = build(schema);
  return validate(data, schema, [], globalCtx);
}

// TODO refactor using some design pattern
function validate(data, schema, instancePath, globalCtx) {
  const path_ = [...instancePath, schema.name];

  if (schema.type === "object")
    return objectValidation(data, schema, path_, validate, globalCtx);
  if (schema.type === "string") return stringValidation(data, schema, path_);
  if (schema.type === "number") return numberValidation(data, schema, path_);
  if (schema.type === "boolean") return booleanValidation(data, schema, path_);
  if (schema.type === "array")
    return arrayValidation(data, schema, path_, validate, globalCtx);
  if (["or", "and", "xor", "not", "if then else"].includes(schema.type))
    return compositionValidation(data, schema, path_, validate, globalCtx);
  if (schema.type === "local_ref") {
    const referencedSchema = globalCtx.$def[schema.ref_id];
    return validate(data, referencedSchema, path_, globalCtx);
  }
}

export default validateSchema;
