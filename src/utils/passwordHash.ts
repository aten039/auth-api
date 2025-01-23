import bcrypt from "bcrypt"

export async function hashPassword(password: string):Promise<string>{

    const salt = await bcrypt.genSalt(10)
    
    const passwordHash = await bcrypt.hash(password, salt)

    return passwordHash
}

export async function validatePassword(password, hash):Promise<boolean>{
    
    return await bcrypt.compare(password, hash)
}