import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { EnterprisesService } from "./enterprises.service";
import { EnterprisesSubjects } from "src/config";
import {
  CreateEnterpriseDto,
  UpdateEnterpriseDto,
  GetEnterpriseDto,
} from "./dto";

@Controller()
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @MessagePattern(EnterprisesSubjects.create)
  create(@Payload() payload: CreateEnterpriseDto) {
    return this.enterprisesService.create(payload);
  }

  @MessagePattern(EnterprisesSubjects.findAll)
  findAll() {
    return this.enterprisesService.findAll();
  }

  @MessagePattern(EnterprisesSubjects.findOne)
  findOne(@Payload() payload: GetEnterpriseDto) {
    return this.enterprisesService.findOne(payload);
  }

  @MessagePattern(EnterprisesSubjects.update)
  update(@Payload() payload: { id: string } & UpdateEnterpriseDto) {
    return this.enterprisesService.update(payload.id, payload);
  }

  @MessagePattern(EnterprisesSubjects.delete)
  remove(@Payload() payload: { id: string }) {
    return this.enterprisesService.remove(payload.id);
  }

  @MessagePattern(EnterprisesSubjects.health)
  health() {
    return this.enterprisesService.health();
  }
}
