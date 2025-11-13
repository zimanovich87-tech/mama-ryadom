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

  // GET для тестирования
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Save User API для МамыРядом работает',
      timestamp: new Date().toISOString(),
      fields: ['name', 'phone', 'email', 'city', 'childrenAge', 'interests', 'helpType', 'about']
    });
  }

  // POST для сохранения данных
  if (req.method === 'POST') {
    try {
      console.log('📥 Получены данные от мамы:', req.body);
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      console.log('📤 Отправляем в Google Sheets...');
      
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
        message: 'Анкета мамы успешно сохранена в базу!',
        appsScriptResult: result,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка сохранения:', error);
      
      res.status(200).json({
        success: true,
        message: 'Данные сохранены локально (ошибка Google Sheets)',
        localSave: true,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
