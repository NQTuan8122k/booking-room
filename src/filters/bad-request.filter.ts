import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ValidationError } from 'class-validator';
import type { Response } from 'express';
import _ from 'lodash';

@Catch(UnprocessableEntityException)
export class HttpExceptionFilter
  implements ExceptionFilter<UnprocessableEntityException>
{
  constructor(public reflector: Reflector) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as { message: ValidationError[] };

    // const validationErrors = r.message;
    // this.validationFilter(validationErrors);
    const ValidationErrorArray = [];
    r.message?.map(
      (ValidationError: {
        target: any;
        property: string;
        children: any[];
        constraints: any;
      }) => {
        const errorTemp = {
          property: ValidationError.property,
          constraints: ValidationError.constraints,
        };
        ValidationErrorArray.push(errorTemp);
      },
    );

    response.status(statusCode).json({
      ...r,
      ...{ message: ValidationErrorArray },
      ...{ error: 'Invalid Request' },
      ...{ error_message_detail: 'Data request fail validation' },
    });
  }

  //   private validationFilter(validationErrors: ValidationError[]): void {
  //     for (const validationError of validationErrors) {
  //       const children = validationError.children;

  //       if (children && !!children) {
  //         this.validationFilter(children);

  //         return;
  //       }

  //       delete validationError.children;

  //       const constraints = validationError.constraints;

  //       if (!constraints) {
  //         return;
  //       }

  //       for (const [constraintKey, constraint] of Object.entries(constraints)) {
  //         // convert default messages
  //         if (!constraint) {
  //           // convert error message to error.fields.{key} syntax for i18n translation
  //           constraints[constraintKey] = `error.fields.${_.snakeCase(
  //             constraintKey,
  //           )}`;
  //         }
  //       }
  //     }
  //   }
}
