function compositionValidation(
  data,
  schema,
  instancePath,
  valdiate,
  globalCtx
) {
  const kind = schema.kind;
  const path_ = [...instancePath, kind];

  if (kind === "or")
    return orCheck(data, schema.schemas, path_, valdiate, globalCtx);
  else if (kind === "and")
    return andCheck(data, schema.schemas, path_, valdiate, globalCtx);
  else if (kind === "xor")
    return xorCheck(data, schema.schemas, path_, valdiate, globalCtx);
  else if (kind === "not")
    return notCheck(data, schema.schemas, path_, valdiate, globalCtx);
}

function orCheck(data, schemas, instancePath, valdiate, globalCtx) {
  const errors = [];

  for (let i = 0; i < schemas.length; i++) {
    const subSchema = schemas[i];
    const ctx_ = valdiate(data, subSchema, [...instancePath, i], globalCtx);
    if (ctx_.valid) return { valid: true, errors: [] };
    errors.push(...ctx_.errors);
  }

  return {
    valid: false,
    errors: [
      ...errors,
      {
        instancePath,
        message: "at least one schema should be valid",
      },
    ],
  };
}

function andCheck(data, schemas, instancePath, valdiate, globalCtx) {
  for (let i = 0; i < schemas.length; i++) {
    const subSchema = schemas[i];
    const ctx_ = valdiate(data, subSchema, [...instancePath, i], globalCtx);

    if (!ctx_.valid)
      return {
        valid: false,
        errors: [
          ...ctx_.errors,
          { instancePath, message: "all schemas must be valid" },
        ],
      };
  }

  return {
    valid: true,
    errors: [],
  };
}

function xorCheck(data, schemas, instancePath, valdiate, globalCtx) {
  let passingSchema = 0;
  const errors = [];

  schemas.forEach((subSchema, i) => {
    const ctx_ = valdiate(data, subSchema, [...instancePath, i], globalCtx);
    if (ctx_.valid) passingSchema++;
    errors.push(...ctx_.errors);
  });

  if (passingSchema > 1)
    return {
      valid: false,
      errors: [
        {
          instancePath,
          passingSchema,
          message: "only one schema should be valid",
        },
      ],
    };
  else if (passingSchema === 0)
    return {
      valid: false,
      errors: [
        ...errors,
        { instancePath, message: "one schema must be valid" },
      ],
    };
  return {
    valid: true,
    errors: [],
  };
}

function notCheck(data, schemas, instancePath, valdiate, globalCtx) {
  let passingSchema = 0;

  for (let i = 0; i < schemas.length; i++) {
    const subSchema = schemas[i];
    const ctx_ = valdiate(data, subSchema, [...instancePath, i], globalCtx);
    if (ctx_.valid) passingSchema++;
  }

  if (passingSchema > 0) {
    return {
      valid: false,
      errors: {
        instancePath,
        passingSchema,
        message: "no schema should be valid",
      },
    };
  }

  return {
    valid: true,
    errors: [],
  };
}

export default compositionValidation;
