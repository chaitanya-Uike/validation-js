import validateSchema from "./validation";

const schema = {
  type: "object",
  properties: [
    {
      type: "string",
      validations: [
        {
          name: "match",
          value:
            '/^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$/i',
        },
      ],
      id: "1fb7c490-ad0b-4090-b106-1cd34aeefa0f",
      name: "email",
      required: true,
    },
    {
      type: "string",
      validations: [
        {
          name: "min",
          value: "6",
        },
        {
          name: "max",
          value: "12",
        },
      ],
      id: "2db1f322-952c-4c98-90fb-7f58d1431a2b",
      name: "password",
      required: true,
    },
  ],
  id: "d5203092-6f90-4272-9e15-c933e76795ac",
  name: "employee_schema",
};

const data = {
  email: "test@email.com",
  password: "Password123",
};

console.log(validateSchema(data, schema));
