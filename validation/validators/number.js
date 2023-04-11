export default function numberValidator(data, validations, addErrorToContext) {
    const length = validations.length
    for (let i = 0; i < length; i++) {
        const validation = validations[i]
        const name = validation.name
        const value = validation.value

        if (value === "") continue

        let pass = true
        let message = ""

        switch (name) {
            case "gt":
                if (data <= value) {
                    pass = false
                    message = `value should be greater than '${value}'`
                }
                break;
            case "gte":
                if (data < value) {
                    pass = false
                    message = `value should be greater than or equal to '${value}'`
                }
                break;
            case "lt":
                if (data >= value) {
                    pass = false
                    message = `value should be less than '${value}'`
                }
                break;
            case "lte":
                if (data > value) {
                    pass = false
                    message = `value should be less than or equal to '${value}'`
                }
                break;
            case "integer":
                if (value && !Number.isInteger(data)) {
                    pass = false
                    message = `integer expected`
                }
                break;
            case "positive":
                if (value && data <= 0) {
                    pass = false
                    message = `positive ( > 0) value expected`
                }
                break;
            case "negative":
                if (value && data >= 0) {
                    pass = false
                    message = `negative (< 0) value expected`
                }
                break;
            case "non-negative":
                if (value && data < 0) {
                    pass = false
                    message = `non-negative ( ≥ 0) value expected`
                }
                break;
            case "non-positive":
                if (value && data > 0) {
                    pass = false
                    message = `non-positive ( ≤ 0) value expected`
                }
                break;
            case "const":
                if (data !== parseFloat(value)) {
                    pass = false
                    message = `value not equal to ${value}`
                }
                break;
            default:
                break;
        }

        if (!pass) addErrorToContext(data, message, name)
    }
}