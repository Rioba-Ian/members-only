import { relations } from "drizzle-orm";
import {
 integer,
 serial,
 text,
 pgTable,
 pgEnum,
 timestamp,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("users", {
 id: serial("id").primaryKey(),
 firstName: text("first_name").notNull(),
 lastName: text("last_name"),
 email: text("email").unique().notNull(),
 kindeId: text("kinde_id").unique(),
 role: rolesEnum("role").default("user"),
});

export const userRelations = relations(users, ({ many }) => ({
 posts: many(posts),
}));

export const posts = pgTable("posts", {
 id: serial("id").primaryKey(),
 userId: integer("user_id"),
 title: text("title").notNull(),
 body: text("body").notNull(),
 createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
 updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
 user: one(users, {
  fields: [posts.userId],
  references: [users.id],
 }),
}));
