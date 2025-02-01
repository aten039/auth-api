import {Request , Response, NextFunction} from "express"

export  function validate_body( property:string, type:string) {

    return ( req:Request, res:Response, next:NextFunction) => {
        try {
            if (!req.body.hasOwnProperty(property)){
                return res.status(400).json({error:{
                    message: `Ha ocurrido un error al procesar su solicitud`,
                    error:true
                }})
            }
    
            if( typeof req.body[property] != type ){
                return res.status(400).json({error:{
                    message: `Ha ocurrido un error al procesar su solicitud`,
                    error:true
                }})
            }
    
            next()

        } catch (error) {
            return res.status(500).json({
                message: `Ha ocurrido un error al procesar su solicitud`,
                error:true
            })
        }
        
    }

}