import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPostSchema, insertSocialAccountSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import { z } from "zod";

// Input validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const body = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(body.email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      const existingUsername = await storage.getUserByUsername(body.username);
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(body.password, 10);
      
      // Create user
      const user = await storage.createUser({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        fullName: body.fullName,
      });
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });
  
  app.post('/api/auth/login', async (req, res) => {
    try {
      const body = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(body.email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Check password
      const isValid = await bcrypt.compare(body.password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });
  
  // Posts routes
  app.get('/api/posts', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }
      
      const posts = await storage.getPosts(userId);
      res.json(posts);
    } catch (error) {
      console.error('Get posts error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/api/posts/:id', async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Get post error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/posts', async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }
      
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost({ ...postData, userId });
      res.json(post);
    } catch (error) {
      console.error('Create post error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });
  
  app.put('/api/posts/:id', async (req, res) => {
    try {
      const postData = insertPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(req.params.id, postData);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Update post error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });
  
  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const success = await storage.deletePost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error('Delete post error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Social Accounts routes
  app.get('/api/social-accounts', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }
      
      const accounts = await storage.getSocialAccounts(userId);
      res.json(accounts);
    } catch (error) {
      console.error('Get social accounts error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/social-accounts', async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }
      
      const accountData = insertSocialAccountSchema.parse(req.body);
      const account = await storage.createSocialAccount({ ...accountData, userId });
      res.json(account);
    } catch (error) {
      console.error('Create social account error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });
  
  app.put('/api/social-accounts/:id', async (req, res) => {
    try {
      const accountData = insertSocialAccountSchema.partial().parse(req.body);
      const account = await storage.updateSocialAccount(req.params.id, accountData);
      if (!account) {
        return res.status(404).json({ error: 'Social account not found' });
      }
      res.json(account);
    } catch (error) {
      console.error('Update social account error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });
  
  app.delete('/api/social-accounts/:id', async (req, res) => {
    try {
      const success = await storage.deleteSocialAccount(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Social account not found' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error('Delete social account error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // User profile routes
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/users/:id', async (req, res) => {
    try {
      const userData = insertUserSchema.partial().parse(req.body);
      
      // Hash password if provided
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      
      const user = await storage.updateUser(req.params.id, userData);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Update user error:', error);
      res.status(400).json({ error: 'Invalid input' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
