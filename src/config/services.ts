export const NATS_SERVICE = "NATS_SERVICE";

export const EnterprisesSubjects = {
  create: "enterprises.create",
  findAll: "enterprises.findAll",
  findOne: "enterprises.findOne",
  update: "enterprises.update",
  delete: "enterprises.delete",
  health: "enterprises.health.check",
} as const;

export const EnterprisesEvents = {
  enterpriseCreated: "enterprises.enterprise.created",
  enterpriseUpdated: "enterprises.enterprise.updated",
  enterpriseDeleted: "enterprises.enterprise.deleted",
} as const;
