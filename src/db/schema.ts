import { pgTable, serial } from "drizzle-orm/pg-core";

export const index = pgTable("index", {
  id: serial("id").primaryKey(),
});
