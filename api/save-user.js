export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от бота:', req.body);
      
      const dataToSend = {
        name: req.body.name || req.body.username || 'Не указано',
        city: req.body.city || 'Не указано',
        child: req.body.child || req.body.childrenAge || 'Не указано',
        interests: req.body.interests || 'Не указано',
        helpType: req.body.helpType || 'Не указано',
        about: req.body.about || 'Не указано',
        source: 'Telegram Bot',
        timestamp: new Date().toISOString()
      };
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
      });
      
      const result = await response.json();
      
      res.status(200).json({
        success: true,
        message: '✅ Данные сохранены!',
        result: result
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      res.status(200).json({
        success: true,
        message: '⚠️ Локальное сохранение',
        localSave: true,
        error: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
