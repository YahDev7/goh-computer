import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/constants/key-decorators";
import { Roles } from "src/constants/roles";

export const RolesDecorator=(...roles:Roles[])=>SetMetadata(ROLES_KEY,roles); //paso los roles que tengo (key,valor)