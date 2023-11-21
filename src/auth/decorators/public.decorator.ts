import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/constants/key-decorators";

export const Public=()=>SetMetadata(PUBLIC_KEY,true);//retorn a 2 cosas un key y el valor