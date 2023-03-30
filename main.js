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

const schema = {
  id: "7ba06ff1-fc62-4bcb-91c0-2d89a47166d9",
  type: "not",
  name: "not_test",
  required: false,
  schemas: [
    {
      id: "6e352338-dd9d-4018-bc9f-5fec28a9bb1f",
      type: "string",
      name: "schema",
      required: false,
      validations: [],
    },
    {
      id: "33b81748-19dd-41ea-8088-91109dbf1c55",
      type: "number",
      name: "schema",
      required: false,
      validations: [],
    },
  ],
};

const data = "hello";

console.log(validateSchema(data, schema));
