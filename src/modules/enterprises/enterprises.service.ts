import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Prisma, PrismaClient } from "@prisma/client";

import { EnterprisesEvents, NATS_SERVICE } from "src/config";
import {
  CreateEnterpriseDto,
  UpdateEnterpriseDto,
  GetEnterpriseDto,
} from "./dto";

@Injectable()
export class EnterprisesService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(EnterprisesService.name);

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Database connection established");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Database connection closed");
  }

  async create(payload: CreateEnterpriseDto) {
    try {
      const enterprise = await this.enterprise.create({
        data: {
          type: payload.type,
          parentId: payload.parentId,
          name: payload.name,
          cifNif: payload.cifNif,
          email: payload.email,
          country: payload.country,
          city: payload.city,
          address: payload.address,
          postalCode: payload.postalCode,
          firstPhonePrefix: payload.firstPhonePrefix,
          firstPhoneNumber: payload.firstPhoneNumber,
          secondPhonePrefix: payload.secondPhonePrefix,
          secondPhoneNumber: payload.secondPhoneNumber,
          iban: payload.iban,
        },
      });

      this.publishEnterpriseCreated(enterprise);

      return enterprise;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async findAll() {
    try {
      const enterprises = await this.enterprise.findMany({
        orderBy: { createdAt: "desc" },
      });

      return enterprises;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async findOne(payload: GetEnterpriseDto) {
    try {
      const enterprise = await this.enterprise.findUnique({
        where: { id: payload.id },
      });

      if (!enterprise) {
        throw new RpcException({
          status: 404,
          message: "Enterprise not found",
        });
      }

      return enterprise;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(id: string, payload: UpdateEnterpriseDto) {
    try {
      await this.findOne({ id });

      const enterprise = await this.enterprise.update({
        where: { id },
        data: payload,
      });

      this.publishEnterpriseUpdated(enterprise);

      return enterprise;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne({ id });

      const enterprise = await this.enterprise.delete({
        where: { id },
      });

      this.publishEnterpriseDeleted(enterprise);

      return enterprise;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async health() {
    return { status: "ok" };
  }

  private publishEnterpriseCreated(enterprise: any): void {
    this.client.emit(EnterprisesEvents.enterpriseCreated, {
      enterpriseId: enterprise.id,
      type: enterprise.type,
      name: enterprise.name,
      cifNif: enterprise.cifNif,
      createdAt: enterprise.createdAt.toISOString(),
    });
  }

  private publishEnterpriseUpdated(enterprise: any): void {
    this.client.emit(EnterprisesEvents.enterpriseUpdated, {
      enterpriseId: enterprise.id,
      name: enterprise.name,
      updatedAt: enterprise.updatedAt.toISOString(),
    });
  }

  private publishEnterpriseDeleted(enterprise: any): void {
    this.client.emit(EnterprisesEvents.enterpriseDeleted, {
      enterpriseId: enterprise.id,
      deletedAt: new Date().toISOString(),
    });
  }

  private handleError(error: any): RpcException {
    if (error instanceof RpcException) {
      return error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new RpcException({
          status: 400,
          message: "Enterprise with this tax ID already exists",
        });
      }
      return new RpcException({
        status: 400,
        message: error.message,
      });
    }

    this.logger.error(error);
    return new RpcException({
      status: 500,
      message: "Internal server error",
    });
  }
}
