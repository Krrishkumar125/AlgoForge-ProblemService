const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class NotFoundError extends BaseError{
    constructor(resourceName,resourceValue){
        super("Not Found", StatusCodes.NOT_FOUND , `The requested resource: ${resourceName} with value ${resourceValue} not found`,{
            resourceName,
            resourceValue
        });
    }
}

module.exports = NotFoundError;