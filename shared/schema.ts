import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const socialAccounts = pgTable("social_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  platform: text("platform").notNull(), // twitter, facebook, linkedin, instagram, tiktok
  platformUsername: text("platform_username").notNull(),
  isConnected: boolean("is_connected").default(true),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  connectedAt: timestamp("connected_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  content: text("content").notNull(),
  mediaUrls: json("media_urls").$type<string[]>().default([]),
  platforms: json("platforms").$type<string[]>().notNull(),
  status: text("status").notNull(), // draft, scheduled, posted, failed
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

export const insertSocialAccountSchema = createInsertSchema(socialAccounts).pick({
  platform: true,
  platformUsername: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  userId: true,
  status: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SocialAccount = typeof socialAccounts.$inferSelect;
export type InsertSocialAccount = z.infer<typeof insertSocialAccountSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

// Platform types and constants
export const PLATFORMS = [
  { id: 'twitter', name: 'Twitter', color: '#1DA1F2' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', color: '#000000' },
] as const;

export const POST_STATUSES = [
  { id: 'draft', name: 'Draft', color: '#6B7280' },
  { id: 'scheduled', name: 'Scheduled', color: '#F59E0B' },
  { id: 'posted', name: 'Posted', color: '#10B981' },
  { id: 'failed', name: 'Failed', color: '#EF4444' },
] as const;
