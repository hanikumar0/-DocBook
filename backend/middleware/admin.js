// middleware/admin.js
module.exports = function (req, res, next) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: admin only" });
    }
    next();
  } catch (err) {
    console.error("Admin middleware error:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
