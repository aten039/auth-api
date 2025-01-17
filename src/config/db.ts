import mongoose, { connection } from "mongoose"
import {exit} from "node:process"

export const connectDb = async ()=>{

    try {
        
        const {connection} = await mongoose.connect(process.env.DB_URL)

        const url = `Se ha iniciado una conexion en la base de datos ${connection.host}:${connection.port}/${connection.name}`
        console.log(url)
    } catch (error) {
        console.log('Error al conectarse a la base de datos')
        exit(1)
    }


}