import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { PUBLIC_KEY, ROLES_KEY } from "src/constants/key-decorators";
import { Roles } from "src/constants/roles";
import { UserService } from "src/user/user.service";

//guardia nos permite  decirle al pasaporte si vamos a usar esa estrategia, podemos implementar  multiples estrategias
@Injectable()
export class RolesGuard implements CanActivate {
  //aqui verificamos si tienen permisos)
  constructor(private reflector: Reflector,
    private UserService: UserService) {
  }
  async canActivate(context: ExecutionContext) {

    const isPOublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())//Si existe el doecorador publico me deje pasar
    //const req = context.switchToHttp().getRequest()//manera de obtener el requesst en un componente
    if (isPOublic) return true

    const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler())//Si existe el doecorador publico me deje pasar
    const req = context.switchToHttp().getRequest()//manera de obtener el requesst en un componente
    const user = req.user; /* as PayLoadToken */; // el as es opcional
    let userAdmin = await this.UserService.getId(user._id)
    
    if (userAdmin['rol'] === "ADMIN") return true
    const isAuth = roles.some((role) => role === userAdmin['rol']);

    if (!isAuth) throw new UnauthorizedException('No autoirizado')
    
    return isAuth;
  }
}