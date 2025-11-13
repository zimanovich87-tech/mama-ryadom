export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  console.log('✅ Ping API received');
  res.status(200).json({ 
    success: true,
    message: "✅ PONG! API работает",
    project: "МамыРядом",
    timestamp: new Date().toISOString(),
    appsScriptURL: "https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec"
  });
}
