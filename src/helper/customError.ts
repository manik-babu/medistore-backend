class NotFoundError extends Error {
    constructor(message: string, ...args: any) {
        super(message, ...args);
        this.name = "NotFoundError";
        this.message = message;
    }
}

class PermissionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PermissionError";
        this.message = message;
    }
}

const CustomError = {
    NotFoundError,
    PermissionError
}
export default CustomError;
