import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,//si hay una propiedad que no esta en el dto lo descarta
    forbidNonWhitelisted:true //lanza un msm por la propiedad que no esta en el dto 
  }))//para que las validaciones funcionen 
  await app.listen(4005);
}
bootstrap();
