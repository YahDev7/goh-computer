import {  ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Console } from 'console';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { useToken } from 'src/utils/use.token';
@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwtloginuser') {
  constructor(private reflector:Reflector){
  super();
 }

 canActivate(contexto:ExecutionContext){
  const is_public=this.reflector.get(PUBLIC_KEY,contexto.getHandler());
  if(is_public){//si es pubico te dare permiso si no continua con lo otro
    return true;
  }
/*   const req = contexto.switchToHttp().getRequest();
  const token = req.headers.authorization.split(' ')[1];
  console.log(token) */
  //poodemos tener un metodo de user o auth en el cual valido el token y lo desencriptoo
/* 
  const req = contexto.switchToHttp().getRequest();
  const token = req.headers.authorization.split(' ')[1];
  const {id}=req.params
  
  let data = useToken(token)

  let enterprise_id=data['enterprise_id'];
  if(enterprise_id!==id)  throw new UnauthorizedException('invalid')
   */
  return super.canActivate(contexto); //si no viene la metadata haslo como viene en aauthwadr(jwt)
 } 
}
