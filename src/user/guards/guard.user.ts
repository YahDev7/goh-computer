import {  ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Console } from 'console';
import { PUBLIC_KEY } from 'src/constants/key-decorators';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwtloginuser') {
  constructor(private reflector:Reflector){
  super();
 }

 canActivate(contexto:ExecutionContext){
  const is_public=this.reflector.get(PUBLIC_KEY,contexto.getHandler());
  console.log(is_public)
  if(is_public){//si es pubico te dare permiso si no continua con lo otro
    return true;
  }
  return super.canActivate(contexto); //si no viene la metadata haslo como viene en aauthwadr(jwt)
 } 
}
