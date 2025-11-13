export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST для сохранения данных
  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от Telegram бота:', JSON.stringify(req.body));
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      // Отправляем RAW данные как есть от бота
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      
      const result = await response.json();
      console.log('✅ Ответ от Google Sheets:', result);
      
      res.status(200).json({
        success: true,
        message: 'Данные сохранены!',
        result: result
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
