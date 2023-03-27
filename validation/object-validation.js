function objectValidation(data, schema, instancePath, valdiate) {
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
      },
    ];
    return ctx;
  }

  schema.properties.forEach((subSchema) => {
    const data_ = data[subSchema.name];
    const ctx_ = valdiate(data_, subSchema, [...instancePath]);

    ctx.valid = ctx.valid && ctx_.valid;
    ctx.errors.push(...ctx_.errors);
  });

  return ctx;
}

export default objectValidation;
