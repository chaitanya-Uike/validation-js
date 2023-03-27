import { isNumeric } from "./utils";

function numberValidation(data, schema, instancePath) {
  const ctx = {
    valid: true,
    errors: [],
  };

  if (!isNumeric(data)) {
    ctx.valid = false;
    ctx.errors = [
      {
        instancePath: [...instancePath, "type"],
        expected: "number",
        recieved: typeof data,
      },
    ];
    return ctx;
  }

  schema.validations.forEach((validation) => {
    const name = validation.name;
    const value = validation.value.trim();

    if (value === "") return;

    if (name === "gt") {
      if (data <= value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "gt"],
          value: data,
          message: `value should be greater than ${value}`,
        });
      }
    } else if (name === "gte") {
      if (data < value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "gte"],
          value: data,
          message: `value should be greater than or equal to ${value}`,
        });
      }
    } else if (name === "lt") {
      if (data >= value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "lt"],
          value: data,
          message: `value should be less than ${value}`,
        });
      }
    } else if (name === "lte") {
      if (data > value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "lte"],
          value: data,
          message: `value should be less than or equal to ${value}`,
        });
      }
    } else if (name === "integer") {
      if (!Number.isInteger(data)) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "integer"],
          value: data,
          message: `integer expected`,
        });
      }
    } else if (name === "positive") {
      if (data <= 0) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "positive"],
          value: data,
          message: `positive ( > 0) value expected`,
        });
      }
    } else if (name === "negative") {
      if (data >= 0) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "negative"],
          value: data,
          message: `negative (< 0) value expected`,
        });
      }
    } else if (name === "non-negative") {
      if (data < 0) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "non-negative"],
          value: data,
          message: `non-negative ( ≥ 0) value expected`,
        });
      }
    } else if (name === "non-positive") {
      if (data > 0) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "non-positive"],
          value: data,
          message: `non-positive ( ≤ 0) value expected`,
        });
      }
    } else if (name === "const") {
      if (data !== parseFloat(value)) {
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

export default numberValidation;