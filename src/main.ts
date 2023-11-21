import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constants/cors';
//con + una variable en proccess.env pasa a numero +process.env.port
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  //app.setGlobalPrefix("api") //provoca que la ruta sea localhost:8000/api/
  /* 
  app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    }); */

  app.enableCors(CORS)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,//si hay una propiedad que no esta en el dto lo descarta
    forbidNonWhitelisted: true, //lanza un msm por la propiedad que no esta en el dto 
    /*  transform:true // nest entiende valida que el DTO cumpla el formato de
      validacion y genera de manera automatica la instancia de la clase que 
      nosotros especificacmos en los tipos */
  }))//para que las validaciones funcionen 

  //que funcione excluir una propiedad de mi validacion ejemp: PASSWORD "NO ME FUNCIONA"
/*   const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector)) */
  
  await app.listen(configService.get("PORT"));
}
bootstrap();
