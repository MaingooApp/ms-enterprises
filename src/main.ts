import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

import { AppModule } from "./app.module";
import { envs } from "./config";

async function bootstrap() {
  const logger = new Logger("Enterprises-MS");

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    }
  );

  await app.listen();
  logger.log(
    `Microservice is listening on NATS: ${envs.natsServers.join(", ")}`
  );
}

bootstrap();
