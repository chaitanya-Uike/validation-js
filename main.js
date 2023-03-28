import validateSchema from "./validation";

const schema = {
  id: 1,
  type: "composition",
  name: "schema",
  kind: "not",
  schemas: [
    {
      id: 2,
      type: "string",
      name: "schema1",
      validations: [
        {
          name: "max",
          value: "6",
        },
      ],
    },
    {
      id: 3,
      type: "number",
      name: "schema2",
      validations: [
        {
          name: "gte",
          value: 10,
        },
      ],
    },
  ],
};

const data = [];

console.log(validateSchema(data, schema));
