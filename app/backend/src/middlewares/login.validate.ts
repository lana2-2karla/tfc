import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import HttpException from '../utils/http.exception';

class loginValidate {
  static schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).messages({
    'any.required': 'All fields must be filled',
    'string.empty': 'All fields must be filled',
  });

  static validateSchema(req: Request, res: Response, next: NextFunction) {
    const { error } = loginValidate.schema.validate(req.body);
    if (error) {
      const { message } = error.details[0];
      throw new HttpException(400, message);
    }
    next();
  }
}

export default loginValidate;
