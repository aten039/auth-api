import { Request, Response, NextFunction } from "express";

export const limitPayloadSize = (req:Request, res:Response, next:NextFunction) => {
    try {
      const MAX_PAYLOAD_SIZE = 15 * (1024 * 1024); // 1MB
      if (req.headers['content-length'] && parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE) {
      return res.status(413).json({message: `Payload size exceeds the limit`,
        error:true });
      }
      next();
    } catch (error) {
      return res.status(413).json({
        message: `Ha ocurrido un error`,
        error:true
    });
    }
    
}