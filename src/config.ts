//utilizarlo en los servicios, se llama normal
import {registerAs} from '@nestjs/config'

export default registerAs('config',()=>{
    return{ 
        database:{
            name:process.env.DATABASE_NAME,
            name_mongodb:process.env.DATABASE_MONGODB,
            port:process.env.DATABASE_PORT,
            username:process.env.DATABASE_USERNAME,
            password:process.env.DATABASE_PASSWORD
        },
        apikey:process.env.API_KEY,
        jwtSecret:process.env.JWTSECRET
    }
})