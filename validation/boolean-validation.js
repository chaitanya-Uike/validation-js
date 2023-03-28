function booleanValidation(data, schema, instancePath) {
  const ctx = {
    valid: true,
    errors: [],
  };

  if (typeof data !== "boolean") {
    ctx.valid = false;
    ctx.errors = [
      {
        instancePath: [...instancePath, "type"],
        expected: "boolean",
        recieved: typeof data,
        message: "boolean expected",
      },
    ];
    return ctx;
  }

  schema.validations.forEach((validation) => {
    const name = validation.name;
    const value = validation.value.trim();

    if (value === "") return;

    if (name === "const") {
      if ((value === "true" && !data) || (value === "false" && data)) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "const"],
          value: data,
          message: `value not equal to ${value}`,
        });
      }
    }
  });

  return ctx;
}

export default booleanValidation;
