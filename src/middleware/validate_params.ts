import {Request , Response, NextFunction} from "express"

export  function validate_params( property:string) {

    return ( req:Request, res:Response, next:NextFunction) => {
        try {
            if (!req.params.hasOwnProperty(property)){
                return res.status(400).json({error:{
                    message: `La propiedad ${property} es obligatoria`,
                    property: property,
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