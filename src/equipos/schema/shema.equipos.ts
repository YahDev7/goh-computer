import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type EquiposDocument = HydratedDocument<Equipos>;

@Schema()
export class Equipos {

    @Prop()
    guia_id: ObjectId;

    @Prop({ default: "Equipo" })
    nombre: string

    @Prop({ type: Object, required: false, default: {tipo:"" }})
    informacion_guia: informacion_guia

    @Prop({ type: Object, required: false,
    default:{
        componentes:[],
        problemas:[],
        conclusiones:""
    }
    })
    diagnostico: {
        componentes: componentes[],
        problemas: problemas[],
        conclusiones: string
    }


    @Prop({ type: Object, required: false,
        default:{
            pro_ser_necesarios:[],
            pro_ser_recomendados:[]
        }
     })
    cotizacion: {
        pro_ser_necesarios: pro_ser_necesarios[],
        pro_ser_recomendados: pro_ser_recomendados[],
        nota: string

    }

    @Prop({ type: Object, required: false,
    default:{conclusiones:"",pruebas:[]}
})
    pruebas_finales: {
        conclusiones: string,
        pruebas:{
            nombre: string,
            imagen: {
                public_id: string
                secure_url: string
                account: string
            },
        }[]
    }
}


interface componentes {
    nombre: string,
    descripcion: string,
    estado: string,
}

interface problemas {
    nombre: string,
    imagen: {
        public_id: string
        secure_url: string
        account: string
    },
}

interface pro_ser_necesarios {
    nombre: string,
    cantidad: number,
    precio: number,

}

interface pro_ser_recomendados {
    nombre: string,
    cantidad: number,
    precio: number,
}

interface informacion_guia {
    tipo: string,
    modelo: string,
    comentario_cliente: string,
    observaciones: string,
    tiempo_uso: string,
    imagen: {
        public_id: string
        secure_url: string
        account: string
    },
    reparacion_otro: boolean,

}


export const EquiposSchema = SchemaFactory.createForClass(Equipos);
