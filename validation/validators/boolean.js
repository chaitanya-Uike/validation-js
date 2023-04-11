export default function booleanValidator(data, validations, addErrorToContext) {
    const length = validations.length
    for (let i = 0; i < length; i++) {
        const validation = validations[i]
        const name = validation.name
        const value = validation.value

        if (value === "") continue

        let pass = true
        let message = ""

        switch (name) {
            case "const":
                if ((value === "true" && !data) || (value === "false" && data)) {
                    pass = false
                    message = `value not equal to '${value}'`
                }
                break;

            default:
                break;
        }

        if (!pass) addErrorToContext(data, message, name)
    }
}