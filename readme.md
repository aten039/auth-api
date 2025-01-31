API designed to be the basis for user management

structure (MVC)

>controllers ----> class with static async methods.<br>
>models ----> create with mongoose. interfaces are used to create the models.<br>
>config ----> application configuration. CORS and DB.<br>
>middleware ----> middleware.<br>
>routes ----> route files.<br>
>server.ts ----> express configuration.<br>
>requirement.txt ----> info #environment variables.<br>

>middlware <br>
*authenticate ----> authorized user in app <br>
*validate_params( property:string)  ----> validate params<br>
*validate_email_unique ----> validate email unique<br>
*validate_phone_data ----> validate phone and unique<br>
*validate_body( property:string, type:string) ----> validate body <br>

>utils <br>
*hashPassword(password: string):Promise<string><br>
*validatePassword(password, hash):Promise<boolean><br>
*generateToken<br>
*validate_objectId(objectId:string):boolean<br>