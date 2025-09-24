import { type User, type InsertUser, type Post, type InsertPost, type SocialAccount, type InsertSocialAccount } from "@shared/schema";
import { db } from "./db";
import { users, posts, socialAccounts } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";
import { randomUUID } from "crypto";

// Storage interface for social media management app
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Post methods
  getPosts(userId: string): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost & { userId: string }): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;
  getPostsByStatus(userId: string, status: string): Promise<Post[]>;
  
  // Social Account methods
  getSocialAccounts(userId: string): Promise<SocialAccount[]>;
  getSocialAccount(id: string): Promise<SocialAccount | undefined>;
  createSocialAccount(account: InsertSocialAccount & { userId: string }): Promise<SocialAccount>;
  updateSocialAccount(id: string, account: Partial<InsertSocialAccount>): Promise<SocialAccount | undefined>;
  deleteSocialAccount(id: string): Promise<boolean>;
  getSocialAccountByPlatform(userId: string, platform: string): Promise<SocialAccount | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updateUser: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updateUser)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Post methods
  async getPosts(userId: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdAt));
  }

  async getPost(id: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async createPost(insertPost: InsertPost & { userId: string }): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values({
        userId: insertPost.userId,
        content: insertPost.content,
        mediaUrls: (insertPost.mediaUrls as string[]) || [],
        platforms: insertPost.platforms as string[],
        scheduledAt: insertPost.scheduledAt || null,
        status: 'draft',
      })
      .returning();
    return post;
  }

  async updatePost(id: string, updatePost: Partial<InsertPost>): Promise<Post | undefined> {
    const updateData: Record<string, any> = {
      updatedAt: new Date()
    };
    
    if (updatePost.content !== undefined) updateData.content = updatePost.content;
    if (updatePost.mediaUrls !== undefined) updateData.mediaUrls = updatePost.mediaUrls;
    if (updatePost.platforms !== undefined) updateData.platforms = updatePost.platforms;
    if (updatePost.scheduledAt !== undefined) updateData.scheduledAt = updatePost.scheduledAt;
    
    const [post] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();
    return post || undefined;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getPostsByStatus(userId: string, status: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(and(eq(posts.userId, userId), eq(posts.status, status)))
      .orderBy(desc(posts.createdAt));
  }

  // Social Account methods
  async getSocialAccounts(userId: string): Promise<SocialAccount[]> {
    return await db
      .select()
      .from(socialAccounts)
      .where(eq(socialAccounts.userId, userId));
  }

  async getSocialAccount(id: string): Promise<SocialAccount | undefined> {
    const [account] = await db.select().from(socialAccounts).where(eq(socialAccounts.id, id));
    return account || undefined;
  }

  async createSocialAccount(insertAccount: InsertSocialAccount & { userId: string }): Promise<SocialAccount> {
    const [account] = await db
      .insert(socialAccounts)
      .values(insertAccount)
      .returning();
    return account;
  }

  async updateSocialAccount(id: string, updateAccount: Partial<InsertSocialAccount>): Promise<SocialAccount | undefined> {
    const [account] = await db
      .update(socialAccounts)
      .set(updateAccount)
      .where(eq(socialAccounts.id, id))
      .returning();
    return account || undefined;
  }

  async deleteSocialAccount(id: string): Promise<boolean> {
    const result = await db.delete(socialAccounts).where(eq(socialAccounts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getSocialAccountByPlatform(userId: string, platform: string): Promise<SocialAccount | undefined> {
    const [account] = await db
      .select()
      .from(socialAccounts)
      .where(and(eq(socialAccounts.userId, userId), eq(socialAccounts.platform, platform)));
    return account || undefined;
  }
}

export const storage = new DatabaseStorage();
