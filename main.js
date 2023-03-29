import validateSchema from "./validation";

// const schema = {
//   id: "1",
//   type: "object",
//   name: "test_schema",
//   properties: [
//     {
//       id: 2,
//       type: "string",
//       name: "country",
//       required: true,
//       validations: [],
//     },
//     {
//       id: 3,
//       type: "string",
//       name: "postalcode",
//       required: true,
//       validations: [],
//     },
//   ],
//   validations: [
//     {
//       id: 10,
//       name: "postalcode_check",
//       type: "composition",
//       kind: "and",
//       schemas: [
//         {
//           id: 4,
//           type: "composition",
//           name: "usa check",
//           kind: "if_then_else",
//           if: {
//             id: 60,
//             type: "object",
//             name: "if",
//             properties: [
//               {
//                 id: 5,
//                 type: "string",
//                 name: "country",
//                 required: true,
//                 validations: [
//                   {
//                     name: "const",
//                     value: "USA",
//                   },
//                 ],
//               },
//             ],
//           },
//           then: {
//             id: 61,
//             type: "object",
//             name: "then",
//             properties: [
//               {
//                 id: 6,
//                 type: "string",
//                 name: "postalcode",
//                 required: true,
//                 validations: [
//                   {
//                     name: "match",
//                     value: "/[0-9]{5}(-[0-9]{4})?/",
//                   },
//                 ],
//               },
//             ],
//           },
//         },
//         {
//           id: 70,
//           type: "composition",
//           name: "canada check",
//           kind: "if_then_else",
//           if: {
//             id: 71,
//             type: "object",
//             name: "if",
//             properties: [
//               {
//                 id: 31,
//                 type: "string",
//                 name: "country",
//                 required: true,
//                 validations: [
//                   {
//                     name: "const",
//                     value: "CANADA",
//                   },
//                 ],
//               },
//             ],
//           },
//           then: {
//             id: 72,
//             type: "object",
//             name: "then",
//             properties: [
//               {
//                 id: 32,
//                 type: "string",
//                 name: "postalcode",
//                 required: true,
//                 validations: [
//                   {
//                     name: "match",
//                     value: "/[A-Z][0-9][A-Z] [0-9][A-Z][0-9]/",
//                   },
//                 ],
//               },
//             ],
//           },
//         },
//       ],
//     },
//   ],
// };

// const usaCode = "20500";
// const canadaCode = "K1M 1M4";

// const data = {
//   country: "CANADA",
//   postalcode: usaCode,
// };

// console.log(validateSchema(data, schema));

const schema = {
  id: 1,
  name: "user",
  type: "object",
  properties: [
    {
      id: 2,
      name: "email",
      type: "string",
      validations: [
        {
          name: "match",
          value:
            '/^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@(([^<>()[\\]\\.,;:\\s@"]+\\.)+[^<>()[\\]\\.,;:\\s@"]{2,})$/i',
        },
      ],
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "string",
      validations: [
        {
          name: "min",
          value: 6,
        },
        {
          name: "max",
          value: 12,
        },
      ],
      required: true,
    },
    {
      id: 3,
      name: "confirm-password",
      type: "string",
      validations: [],
      required: true,
    },
  ],
  validations: [
    {
      name: "equals",
      properties: ["password", "confirm-password"],
    },
  ],
};
