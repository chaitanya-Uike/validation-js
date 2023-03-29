import validateSchema from "./validation";

const schema = {
  id: "1",
  type: "object",
  name: "test_schema",
  properties: [
    {
      id: "2",
      type: "string",
      name: "country",
      required: true,
    },
    {
      id: "3",
      type: "string",
      name: "postalcode",
      required: true,
    },
  ],
  validations: [
    {
      id: "4",
      type: "composition",
    },
  ],
};

const data = false;

console.log(validateSchema(data, schema));
