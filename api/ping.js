export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('✅ Ping received');
  res.status(200).json({ 
    success: true,
    message: "✅ PONG! API МамыРядом работает",
    timestamp: new Date().toISOString(),
    project: "МамыРядом",
    version: "2.0"
  });
}
