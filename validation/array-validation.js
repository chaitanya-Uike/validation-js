function arrayValidation(data, schema, instancePath, validate, globalCtx) {
  const ctx = {
    valid: true,
    errors: [],
  };

  if (!Array.isArray(data)) {
    ctx.valid = false;
    ctx.errors = [
      {
        instancePath: [...instancePath, "type"],
        expected: "array",
        recieved: typeof data,
        message: "array expected",
      },
    ];
    return ctx;
  }

  const itemSchema = schema.items;

  data.forEach((data_, index) => {
    const path_ = [...instancePath, index];
    const ctx_ = validate(data_, itemSchema, path_, globalCtx);

    ctx.valid = ctx.valid && ctx_.valid;
    ctx.errors.push(...ctx_.errors);
  });

  return ctx;
}

export default arrayValidation;
