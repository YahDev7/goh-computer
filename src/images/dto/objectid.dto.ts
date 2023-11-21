import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsMongoId } from "class-validator";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export class OnlyIDParamDTO {
    
    @IsMongoId()
    @Transform((value) => SafeMongoIdTransform(value))
    enterprise_id: ObjectId;
  }

  const SafeMongoIdTransform = ({ value }) => {
    try {
      if (
        Types.ObjectId.isValid(value) &&
        new Types.ObjectId(value).toString() === value
      ) {
        return value;
      }
      throw new BadRequestException('Id validation fail');
    } catch (error) {
      throw new BadRequestException('Id validation fail');
    }
  };