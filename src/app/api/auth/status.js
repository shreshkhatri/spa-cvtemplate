// pages/api/auth/status.js
export default function handler(req, res) {
    res.status(200).json({ isAuthenticated: req.isAuthenticated() });
  }
  