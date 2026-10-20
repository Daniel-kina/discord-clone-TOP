import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

export { AuthenticatedRequest };
