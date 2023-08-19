import { Injectable } from '@nestjs/common';
import { DocumentoService } from 'src/documento/documento.service';
import { MovimientoMService } from 'src/movimiento-m/movimiento-m.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ServiciosService {
    constructor(
      /*   private ProductosService:ProductsService,
        private DocumentoService:DocumentoService,
        private MovimientoService:MovimientoMService */


    ){}
}
