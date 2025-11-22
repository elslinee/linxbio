import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRE = "7d";

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRE });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
