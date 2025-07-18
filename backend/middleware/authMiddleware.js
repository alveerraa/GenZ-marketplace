const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("Auth missing or wrong format");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("JWT verify failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = auth;
