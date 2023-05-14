import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
/* 
  app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    }); */
   app.enableCors({
    credentials: true,
    origin:['http://127.0.0.1:5173','https://boisterous-kringle-fbc71c.netlify.app'],
    methods: ["GET", "POST"],
  }) 
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,//si hay una propiedad que no esta en el dto lo descarta
    forbidNonWhitelisted:true //lanza un msm por la propiedad que no esta en el dto 
  }))//para que las validaciones funcionen 
  await app.listen(4005);
}
bootstrap();
