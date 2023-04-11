class ValidationError {
    constructor(value, message, path) {
        this.value = value
        this.message = message
        this.path = path.join("/")
    }
}

export default ValidationError