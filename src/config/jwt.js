import jwt from "jsonwebtoken";

export const aToken = (payload) => {
  return jwt.sign(payload, "JEFPJF127344923H29384YD9233442DH", {
    expiresIn: "30m",
  });
};