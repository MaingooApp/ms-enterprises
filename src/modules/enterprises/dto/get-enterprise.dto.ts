import { IsString } from "class-validator";

export class GetEnterpriseDto {
  @IsString()
  id!: string;
}
