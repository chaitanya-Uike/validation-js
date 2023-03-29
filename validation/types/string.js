import { isNumeric } from "../utils";

function stringValidation(data, schema, instancePath) {
  const ctx = {
    valid: true,
    errors: [],
  };

  const isAlphaRegex = /^[a-zA-Z]*$/;
  const isAlNumRegex = /^[a-z0-9]+$/i;

  if (typeof data !== "string") {
    ctx.valid = false;
    ctx.errors = [
      {
        instancePath: [...instancePath, "type"],
        expected: "string",
        recieved: typeof data,
        message: "string expected",
      },
    ];
    return ctx;
  }

  schema.validations?.forEach((validation) => {
    const name = validation.name;
    const value = validation.value;

    if (value === "") return;

    if (name === "min") {
      if (data.length < value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "min"],
          value: data,
          message: `minimum length should be ${value}`,
        });
      }
    } else if (name === "max") {
      if (data.length > value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "max"],
          value: data,
          message: `maximum length should be ${value}`,
        });
      }
    } else if (name === "length") {
      if (data.length !== value) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "length"],
          value: data,
          message: `length should be ${value}`,
        });
      }
    } else if (name === "match") {
      const res = reviveRegex(value).test(data);
      if (!res) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "match"],
          value: data,
          message: "value not matching regex",
          regex: value,
        });
      }
    } else if (name === "isAlpha") {
      if (value && !isAlphaRegex.test(data)) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "isAlpha"],
          value: data,
          message: "value should only contain alphabets",
        });
      }
    } else if (name === "isAlNum") {
      if (value && !isAlNumRegex.test(data)) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "isAlNum"],
          value: data,
          message: "value should only contain alphaNumeric characters",
        });
      }
    } else if (name === "isNum") {
      if (value && !isNumeric(data)) {
        ctx.valid = false;
        ctx.errors.push({
          instancePath: [...instancePath, "validations", "isNum"],
          value: data,
          message: "value should only contain numeric characters",
        });
      }
    } else if (name === "const") {
      if (data !== value) {
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

function reviveRegex(regexString) {
  const m = regexString.match(/\/(.*)\/(.*)?/);
  return new RegExp(m[1], m[2] || "");
}

export default stringValidation;
