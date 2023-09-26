// pages/api/auth/logout.js
export default function handler(req, res) {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully' });
  }
  