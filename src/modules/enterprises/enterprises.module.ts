import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { EnterprisesController } from "./enterprises.controller";
import { EnterprisesService } from "./enterprises.service";
import { envs, NATS_SERVICE } from "src/config";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
          reconnect: true,
          maxReconnectAttempts: -1,
          reconnectTimeWait: 2000,
          timeout: 5000,
          name: "ms-enterprises",
          maxPayload: 20 * 1024 * 1024, // 20MB limit
        },
      },
    ]),
  ],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
})
export class EnterprisesModule {}
