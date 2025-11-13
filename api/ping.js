export default function handler(req, res) {
  res.json({ 
    success: true,
    message: "✅ API работает!",
    timestamp: new Date().toISOString()
  });
}
