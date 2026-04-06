// import { HttpException, HttpStatus } from '@nestjs/common';

// export class AppException extends HttpException {
//     constructor(
//         message: string,
//         statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
//         errorCode?: string
//     ) {
//         super(message, statusCode);
//         this.errorCode = errorCode;
//     }

//     public readonly errorCode?: string;
// }

import { HttpException, HttpStatus } from '@nestjs/common';
export class AppException extends HttpException {
    constructor(
        message: string,
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
        errorCode?: string
    ) {
        super (message, statusCode);
   }
}