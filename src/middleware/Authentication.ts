import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_TOKEN } = process.env

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please Try Again');
  //error.status = 401
  next(error);
}

const validateTokenMiddleware = ( req: Request, _res: Response, next: NextFunction ) => {
  try {
    
    //get authheaders
    const authheaders = req.get('authorization');
    //check authheaders validate
    if (authheaders) {
      
      //get value of token
      const bearer = authheaders.split(' ')[0].toLowerCase();
      const token = authheaders.split(' ')[1];
      //check if it's a bearer token
      if (token && bearer === 'bearer') {
        //verify token based on the token secret
        console.log('inside auth headers', token);
        const decodedToken = jwt.verify(token, JWT_TOKEN as unknown as string);
        // next
        if (decodedToken) {
          next();
        } else {
          // failed to authenticate
          handleUnauthorizedError(next);
        }
      }
      else {
        //token type invalid
        handleUnauthorizedError(next);
      }
    } else {
      // no token provided
      handleUnauthorizedError(next);
    }
  } catch (error) {
    handleUnauthorizedError(next);
  }
}

export default validateTokenMiddleware;