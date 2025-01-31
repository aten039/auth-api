

export function generateToken(){
    const numbers: number[] = []
    for (let i = 0; i < 6 ; i++){
        numbers.push(Math.floor(Math.random() * 10))
    }
    return numbers.join('')
}

export function sendTokenEmail(token:string){

    // code for send email

    //

    console.log(`enviando token: ${token}`)
}