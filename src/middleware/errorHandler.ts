import { NextFunction, Request, Response } from "express";
import CustomError from "../helper/customError";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let statusMessage = "Something went wrong!"

    if (error instanceof CustomError.NotFoundError) {
        statusCode = 404;
        statusMessage = error.message;
    }
    else if (error instanceof CustomError.PermissionError) {
        statusCode = 403;
        statusMessage = error.message;
    }
    else if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        statusMessage = "Post creation faild! Invalid input type or require field is empty"
    }


    res.status(statusCode).json({
        ok: false,
        status: statusCode,
        message: statusMessage,
        error: error
    })
}

export default globalErrorHandler;