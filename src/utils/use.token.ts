import * as jwt from 'jsonwebtoken'
import { StructureToken } from 'src/user/dto/user.dto';

export  function useToken(token: string) {
    const decode =jwt.decode(token)
    return decode;

}