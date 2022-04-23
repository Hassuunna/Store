import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';

// The token secret saved in our env variable
const secretToken = process.env.JWT_SECRET as string; 

function Verify(req: Request, userId?: number) {
  // Bearer token ex: bearer eyJhbGciOiJIUz...
  const authorizationHeader = req.headers.authorization; 
  // Split the string to get the token after the word bearer
  const token = authorizationHeader!.split(' ')[1]; 
  // Return the decoded payload
  const decoded = verify(token as string, secretToken) as JwtPayload; 
  // If the userId is passed and the decoded userId is not the same as the passed userId
  if (userId && decoded.user.userId != userId) {
    // Throw an error
    throw new Error('User id does not match!'); 
  }
}

function Sign(userId: number) {
  return sign({ user: { userId } }, secretToken); // Sign the token and add the userId to it
}

export { Verify, Sign };
