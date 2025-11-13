export default function handler(req, res) {
  res.json({ 
    success: true,
    message: "✅ PONG! API работает",
    timestamp: new Date().toISOString()
  });
}
