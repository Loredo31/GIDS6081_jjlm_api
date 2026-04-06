import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";

export class AllExceptionsFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse <Response> ();
        const request = ctx.getRequest <Request> ();

        const status = exception instanceof HttpException 
        ? exception.getStatus() 
        : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

        // FIXME: Almacenar en la base de datos

        // Request del servidor
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: 
                typeof message === 'string' 
                ? message 
                : (message as any).message || message, 
                errorCode: (exception as any).code || 'UNKNOWN_ERROR'
        });
    }

}