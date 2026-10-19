export const errorhandling = (err, res) => {
  if (err.name === "ValidationError") return res.status(400).send({ status: false, message: err.message });
  if (err.name === "CastError") return res.status(400).send({ status: false, message: "Invalid ID format" });
  if (err.code === 11000) return res.status(409).send({ status: false, message: "Duplicate data already exists" });
  if (err.name === "JsonWebTokenError") return res.status(401).send({ status: false, message: "Invalid token" });
  if (err.name === "TokenExpiredError") return res.status(401).send({ status: false, message: "Token expired" });
  if (err.name === "UnauthorizedError") return res.status(401).send({ status: false, message: "Unauthorized access" });
  if (err.status === 403) return res.status(403).send({ status: false, message: "Access forbidden" });
  if (err.status === 404) return res.status(404).send({ status: false, message: "Resource not found" });
  if (err.status === 405) return res.status(405).send({ status: false, message: "Method not allowed" });
  if (err.status === 409) return res.status(409).send({ status: false, message: err.message });
  if (err.status === 429) return res.status(429).send({ status: false, message: "Too many requests" });

  return res.status(500).send({ status: false, message: err.message });
};