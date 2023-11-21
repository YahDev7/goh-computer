import {   Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

//guardia nos permite  decirle al pasaporte si vamos a usar esa estrategia, podemos implementar  multiples estrategias
@Injectable()
export class AuthCustomerGuard extends AuthGuard("authCustomer"){
}