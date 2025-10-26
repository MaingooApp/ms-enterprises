import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { EntityType } from "./create-enterprise.dto";

export class UpdateEnterpriseDto {
  @IsOptional()
  @IsEnum(EntityType)
  type?: EntityType;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  cifNif?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  firstPhonePrefix?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  firstPhoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  secondPhonePrefix?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  secondPhoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(34)
  iban?: string;
}
