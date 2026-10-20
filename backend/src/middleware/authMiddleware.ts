import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/authTypes";

const JWT_SECRET = process.env.JWT_SECRET || "super-geheimes-geheimnis";

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];

  // Der Header sieht normalerweise so aus: "Bearer eyJhbGciOiJIUzI1Ni..."
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ error: "Zugriff verweigert. Kein Token vorhanden." });
    return;
  }

  try {
    // 3. Verifiziere den Token mit unserem Secret
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
    };

    // 4. Speichere die User-Daten im Request-Objekt, damit der Controller darauf zugreifen kann
    req.user = decoded;

    // 5. Alles paletti! Weiter zum eigentlichen Controller
    next();
  } catch (error) {
    res.status(403).json({ error: "Ungültiger oder abgelaufener Token." });
  }
};

export { verifyToken };
