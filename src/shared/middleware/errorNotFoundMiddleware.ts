import { Request, Response, NextFunction } from 'express';

export function errorNotFound(req: Request | null, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`Not Found`);
    next(error);
  }
  