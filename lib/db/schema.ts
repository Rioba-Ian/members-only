import { integer, serial, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("users", {
 id: serial("id").primaryKey(),
 firstName: text("first_name").notNull(),
 lastName: text("last_name"),
 email: text("email").unique().notNull(),
 kindeId: text("kinde_id").unique(),
 role: rolesEnum("role").default("user"),
});

export const posts = pgTable("posts", {
 id: serial("id").primaryKey(),
 userId: integer("user_id").references(() => users.id),
 title: text("title").notNull(),
 body: text("body").notNull(),
});
