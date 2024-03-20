import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/constants/key-decorators';
import { Roles } from 'src/constants/roles';
/* import { ROLES_KEY } from 'src/login/decorators/roles.decorator';
import { Role } from 'src/login/dto/roles.dto';
import { PayLoadToken } from 'src/login/dto/token.dto'; */

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector)
  {}//permite leer atrubutos de decoradores
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    const roles=this.reflector.get<Roles[]>(ROLES_KEY,context.getHandler()) //siempre dara un array de los roles y de ellos llamaremos a uno
    if(!roles){
      return true
    }
    const req=context.switchToHttp().getRequest()//manera de obtener el requesst en un componente
    const user =req.user; /* as PayLoadToken */; // el as es opcional
    
    const isAuth =roles.some((role)=>role===user.rol);
    if(!isAuth){
      throw new UnauthorizedException('Error al iniciar sesion')
    }
    return isAuth; 
    
  }
}
