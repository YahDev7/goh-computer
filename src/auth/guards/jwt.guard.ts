import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { PUBLIC_KEY } from "src/constants/key-decorators";
//guardia nos permite  decirle al pasaporte si vamos a usar esa estrategia, podemos implementar  multiples estrategias
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwtauth") {
    //aqui verificamos si tienen permisos)
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        //        const is_public=this.reflector.get(PUBLIC_KEY,contexto.getHandler());
        const isPOublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())//Si existe el doecorador publico me deje pasar
        //const req = context.switchToHttp().getRequest()//manera de obtener el requesst en un componente
        if (isPOublic) return true


//        return super.canActivate(context);
    }
}