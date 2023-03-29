function objectValidation(data, schema, instancePath, validate, globalCtx) {
  const ctx = {
    valid: true,
    errors: [],
  };

  const recievedType = Array.isArray(data) ? "array" : typeof data;
  if (recievedType !== "object") {
    ctx.valid = false;
    ctx.errors = [
      {
        instancePath: [...instancePath, "type"],
        expected: "object",
        recieved: recievedType,
        message: "object expected",
      },
    ];
    return ctx;
  }

  schema.properties.forEach((subSchema) => {
    const data_ = data[subSchema.name];

    if (subSchema.required && data_ === undefined) {
      ctx.valid = false;
      ctx.errors.push({
        instancePath: [...instancePath, subSchema.name, "required"],
        message: `required field ${subSchema.name} missing`,
      });
      return;
    } else if (data_ !== undefined) {
      const ctx_ = validate(data_, subSchema, instancePath, globalCtx);

      ctx.valid = ctx.valid && ctx_.valid;
      ctx.errors.push(...ctx_.errors);
    }
  });

  return ctx;
}

export default objectValidation;
