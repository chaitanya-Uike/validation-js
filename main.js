import validateSchema from "./validation";

const schema = {
  id: 0,
  type: "object",
  name: "root",
  properties: [
    {
      type: "string",
      name: "1",
      id: 1,
      validations: [],
    },
    {
      type: "number",
      name: "2",
      id: 2,
      validations: [],
    },
    {
      type: "local_ref",
      name: "3",
      id: 3,
      path: ["properties", 1],
      ref_id: 2,
    },
    {
      type: "number",
      name: "4",
      id: 4,
      validations: [],
    },
    {
      type: "object",
      name: "5",
      id: 5,
      properties: [
        {
          type: "local_ref",
          name: "6",
          id: 6,
          path: [],
          ref_id: 0,
        },
        {
          type: "boolean",
          name: "7",
          id: 7,
          validations: [],
        },
      ],
    },
    {
      type: "local_ref",
      name: "8",
      id: 8,
      path: ["properties", 4],
      ref_id: 5,
    },
    {
      type: "local_ref",
      name: "9",
      id: 9,
      path: ["properties", 4, 0],
      ref_id: 6,
    },
  ],
};

const data = {
  1: "hello",
  2: 69,
  3: 420,
  4: 40,
  5: {
    6: {
      1: "hello",
      2: 69,
      3: 420,
      4: 40,
      5: {
        6: [],
        7: true,
      },
      8: {
        7: true,
      },
    },
    7: true,
  },
  8: {
    6: {
      1: "hello",
      2: 69,
      3: 420,
      4: 40,
      5: {
        7: true,
      },
      8: {
        7: true,
      },
    },
    7: true,
  },
  9: {
    1: "hello",
    2: 69,
    3: 420,
    4: 40,
    5: {
      7: true,
    },
    8: {
      7: true,
    },
  },
};

console.log(validateSchema(data, schema));
