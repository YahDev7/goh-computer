import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipos, EquiposSchema } from './schema/shema.equipos';
import { EquipoService } from './equipos.service';
import { EquiposController } from './equipos.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Equipos.name,
            schema: EquiposSchema,
        }
    ]),
    ],
    providers: [EquipoService],
    controllers: [EquiposController],
    exports: [EquipoService]
})
export class EquiposModule { }
