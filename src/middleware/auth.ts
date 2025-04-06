import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Tipo do payload do token
interface JwtPayload {
  account: string;
  type: string;
  exp: number;
  iat: number;
}

// Estendendo o Request
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const secret = process.env.JWT_SECRET!; // use process.env.JWT_SECRET

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};
