export class ApiResponse{
    constructor(statusCode, data, message, code){
        this.statusCode = statusCode;
        this.code = code;
        this.data = data;
        this.message = message;
    }
}