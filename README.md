# Enterprises Microservice

Microservice for managing enterprises in the Maingoo platform.

## Features

- Create, read, update, and delete enterprises
- PostgreSQL database with Prisma ORM
- NATS messaging for inter-service communication
- Event publishing for enterprise lifecycle

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Installation

```bash
npm install
```

## Running the service

```bash
# development
npm run start:dev

# production
npm run start:prod
```

## Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## API (NATS Messages)

### Create Enterprise

- Pattern: `enterprises.create`
- Payload: `{ name, description?, address?, phone?, email?, taxId? }`

### List Enterprises

- Pattern: `enterprises.findAll`
- Payload: `{}`

### Get Enterprise

- Pattern: `enterprises.findOne`
- Payload: `{ id }`

### Update Enterprise

- Pattern: `enterprises.update`
- Payload: `{ id, name?, description?, address?, phone?, email?, taxId? }`

### Delete Enterprise (soft delete)

- Pattern: `enterprises.delete`
- Payload: `{ id }`
