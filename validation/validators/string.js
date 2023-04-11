export default function stringValidator(data, validations, addErrorToContext) {
    const length = validations.length
    for (let i = 0; i < length; i++) {
        const validation = validations[i]
        const name = validation.name
        const value = validation.value

        if (value === "") continue

        let pass = true
        let message = ""
        switch (name) {
            case "min":
                if (data.length < parseInt(value)) {
                    pass = false
                    message = `maximum length should be '${value}'`
                }
                break
            case "max":
                if (data.length > parseInt(value)) {
                    pass = false
                    message = `maximum length should be '${value}'`
                }
                break
            case "length":
                if (data.length !== parseInt(value)) {
                    pass = false
                    message = `length should be '${value}'`
                }
                break
            case "match":
                if (!reviveRegex(value).test(data)) {
                    pass = false
                    message = "value not matching regex"
                }
                break
            case "isAlpha":
                if (value && !(/^[a-zA-Z]*$/.test(data))) {
                    pass = false
                    message = "value should only contain alphabets"
                }
                break
            case "isAlNum":
                if (value && !(/^[a-z0-9]+$/i.test(data))) {
                    pass = false
                    message = "value should only contain alphaNumeric characters"
                }
                break
            case "isNum":
                if (value && !isNumeric(data)) {
                    pass = false
                    message = "value should only contain numeric characters"
                }
                break
            case "const":
                if (data !== value) {
                    pass = false
                    message = `value not equal to '${value}'`
                }
                break
            default:
                break;
        }

        if (!pass) addErrorToContext(data, message, name)
    }
}

function reviveRegex(regexString) {
    const m = regexString.match(/\/(.*)\/(.*)?/);
    return new RegExp(m[1], m[2] || "");
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}