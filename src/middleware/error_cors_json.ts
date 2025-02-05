import { Request, Response, NextFunction } from "express"


export const error_cors_json = (err, req:Request, res:Response, next:NextFunction )=>{

    if(err){
        return res.status(500).json( {
            message: `Ha ocurrido un error.`,
            error:true
        })
    }

    next()
}