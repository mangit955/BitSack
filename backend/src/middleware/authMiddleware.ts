import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Invalid token or missing authorization header");
    res.status(401).json({
      message: "Authorization header is missing or malformed",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  try {
    const secret = process.env.JWT_PASSWORD || "default_secret"; // 🔑 ensure same as signin
    const decoded = jwt.verify(token, secret) as JwtPayload & { id: string };

    console.log("Decoded JWT:", decoded);

    req.userId = decoded.id; // attach user id to request
    next();
  } catch (e) {
    console.error("Error verifying JWT:", e);
    res.status(403).json({
      message: "Invalid token or expired",
    });
  }
};
