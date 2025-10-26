import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  DATABASE_URL: string;
}

const envSchema = joi
  .object<EnvVars>({
    PORT: joi.number().default(3004),
    NATS_SERVERS: joi.array().items(joi.string()).min(1).required(),
    DATABASE_URL: joi
      .string()
      .uri({ scheme: [/postgres/, /postgresql/] })
      .required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env["NATS_SERVERS"]
    ?.split(",")
    .map((item) => item.trim()),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  databaseUrl: envVars.DATABASE_URL,
};
