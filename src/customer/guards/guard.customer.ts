import {  ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
/* import { IS_PUBLIC_KEY } from 'src/login/decorators/public.decorator'; */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwtlogin') {
/*  constructor(private reflector:Reflector){
  super();
 }

 canActivate(contexto:ExecutionContext){
  const is_public=this.reflector.get(IS_PUBLIC_KEY,contexto.getHandler());
  if(is_public){//si es pubico te dare permiso si no continua con lo otro
    return true;
  }
  return super.canActivate(contexto); //si no viene la metadata haslo como viene en aauthwadr(jwt)
 } */
}
