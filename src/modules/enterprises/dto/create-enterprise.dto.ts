import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export enum EntityType {
  RESTAURANT = "RESTAURANT",
  SUPPLIER = "SUPPLIER",
}

export class CreateEnterpriseDto {
  @IsEnum(EntityType)
  @IsNotEmpty()
  type!: EntityType;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

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
