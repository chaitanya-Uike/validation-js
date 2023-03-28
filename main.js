const schema = {
  id: 1,
  type: "object",
  name: "root",
  properties: [
    {
      type: "string",
      name: "1",
      id: 1,
    },
    {
      type: "number",
      name: "2",
      id: 2,
    },
    {
      type: "local_ref",
      name: "3",
      id: 3,
      path: ["properties", 1],
    },
    {
      type: "number",
      name: "4",
      id: 4,
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
        },
        {
          type: "boolean",
          name: "7",
          id: 7,
        },
      ],
    },
    {
      type: "local_ref",
      name: "8",
      id: 8,
      path: ["properties", 4],
    },
    {
      type: "local_ref",
      name: "9",
      id: 9,
      path: ["properties", 4, 0],
    },
  ],
};


function resolveDependancy(schema, globalCtx)
