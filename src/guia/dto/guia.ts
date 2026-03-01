import { IsNotEmpty, IsOptional, IsEmail, Length, IsNumberString, MaxLength, IsEmpty, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';






// export class UpdateCustomerDto extends PartialType(CustomerDto) {}