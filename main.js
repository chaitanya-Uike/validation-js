import SchemaValidator from "./validation";


const schema = {
    "id": "cc97eb31-7286-43df-b823-ddf0b979883d",
    "type": "object",
    "name": "schema",
    "required": false,
    "validations": [],
    "properties": [
        {
            "id": "bd4a60e6-8fb0-4a21-b3ed-ab80fcc8d929",
            "type": "string",
            "name": "email",
            "required": true,
            "validations": [
                {
                    "name": "match",
                    "value": "/^(([^<>()[\\]\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()[\\]\\.,;:\\s@\\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\\"]{2,})$/i"
                }
            ]
        },
        {
            "id": "35d4c3c0-3def-4b82-9947-fa0d7598dc58",
            "type": "array",
            "name": "numbers",
            "required": true,
            "validations": [],
            "items": {
                "id": "cd5a7c18-900e-4f91-a92d-677242ceb33b",
                "type": "object",
                "name": "schema",
                "required": false,
                "validations": [],
                "properties": [
                    {
                        "id": "37f274d6-fc43-4492-a416-4165c15d5a8e",
                        "type": "number",
                        "name": "num",
                        "required": true,
                        "validations": [
                            {
                                "name": "gte",
                                "value": "10"
                            },
                            {
                                "name": "integer",
                                "value": true
                            }
                        ]
                    }
                ]
            }
        }
    ],
    "schema_ref": []
}

const data = {
    email: "test@email.com",
    numbers: [{ num: 11 }, { num: 10.5 }, { num: true }]
}

const validate = new SchemaValidator()

console.log(validate.validateSchema(data, schema))