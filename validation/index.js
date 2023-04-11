import ValidationError from "./validation_error";
import stringValidator from "./validators/string";
import numberValidator from "./validators/number";
import booleanValidator from "./validators/boolean";

class SchemaValidator {
    constructor() {
        this.valid = true
        this.errors = []
        this.path = []
    }

    validateSchema(data, schema) {
        this.validate(data, schema, this.addErrorToContext.bind(this))
        return {
            valid: this.valid,
            errors: this.errors
        }
    }

    validate(data, schema, addErrorToContext) {
        const methodName = `validate_${schema.type}`;
        const validator = this[methodName]

        this.path.push(schema.name)
        validator.call(this, data, schema, addErrorToContext)
        this.path.pop()
    }

    addTypeError(expected, value) {
        this.valid = false
        const recievedType = Array.isArray(value) ? "array" : typeof value;
        const message = `expected ${expected} recieved ${recievedType}`
        this.path.push("type")
        this.errors.push(new ValidationError(value, message, this.path))
        this.path.pop()
    }

    addErrorToContext(data, message, validationName) {
        this.valid = false
        this.path.push(validationName)
        this.errors.push(new ValidationError(data, message, this.path))
        this.path.pop()
    }

    validate_object(data, schema, addErrorToContext) {
        const recievedType = Array.isArray(data) ? "array" : typeof data;
        if (recievedType !== "object") {
            this.addTypeError("object", data)
            return
        }

        // valdiate properties
        this.path.push("properties")
        const noOfProperties = schema.properties?.length || 0
        for (let i = 0; i < noOfProperties; i++) {
            const subSchema = schema.properties[i]
            const data_ = data[subSchema.name]

            if (subSchema.required && data_ === undefined)
                addErrorToContext(data_, `required field '${subSchema.name}' missing`, "required")
            else if (data_ !== undefined)
                this.validate(data_, subSchema, addErrorToContext)
        }
        this.path.pop()

        // object validations are just schemas
        this.path.push("validations")
        const noOfValidations = schema.validations?.length || 0
        for (let i = 0; i < noOfValidations; i++) {
            this.validate(data, schema.validations[i], addErrorToContext)
        }
        this.path.pop()
    }

    validate_array(data, schema, addErrorToContext) {
        if (!Array.isArray(data)) {
            this.addTypeError("array", data)
            return
        }

        const itemSchema = schema.items;

        if (itemSchema) {
            const length = data.length
            for (let i = 0; i < length; i++) {
                this.path.push(i)
                this.validate(data[i], itemSchema, addErrorToContext)
                this.path.pop()
            }
        }
    }

    validate_string(data, schema, addErrorToContext) {
        if (typeof data !== "string") {
            this.addTypeError("string", data)
            return
        }

        this.path.push("validations")
        stringValidator(data, schema.validations, addErrorToContext)
        this.path.pop()
    }

    validate_number(data, schema, addErrorToContext) {
        if (typeof data !== "number") {
            this.addTypeError("number", data)
            return
        }

        this.path.push("validations")
        numberValidator(data, schema.validations, addErrorToContext)
        this.path.pop()
    }

    validate_boolean(data, schema, addErrorToContext) {
        if (typeof data !== "boolean") {
            this.addTypeError("boolean", data)
            return
        }

        this.path.push("validations")
        booleanValidator(data, schema.validations, addErrorToContext)
        this.path.pop()
    }
}

export default SchemaValidator
