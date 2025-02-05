import { Request, Response, NextFunction } from "express";


export const timeout = (req:Request, res:Response, next:NextFunction) => {
    req.setTimeout(5000); // Set request timeout to seconds
    res.setTimeout(5000); // Set response timeout to seconds
    next();
  }