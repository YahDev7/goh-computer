import { Module } from '@nestjs/common';
import { LibroReclaController } from './libro_recla.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LibroRecla, LibroReclaSchema } from './schema/libro_recla.shema';
import { LibroReclaService } from './libro_recla.service';
import { CorreoModule } from 'src/correo/correo.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:LibroRecla.name,
      schema:LibroReclaSchema,
    }
  ]),CorreoModule],
  providers: [LibroReclaService],
  controllers: [LibroReclaController],
  exports:[LibroReclaService]

})
export class LibroReclaModule {}
