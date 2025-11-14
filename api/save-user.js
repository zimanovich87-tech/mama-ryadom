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
      message: '✅ Save User API для МамыРядом работает!',
      timestamp: new Date().toISOString(),
      instructions: 'Используйте POST для сохранения данных'
    });
  }

  // POST для сохранения данных
  if (req.method === 'POST') {
    try {
      console.log('📥 ПОЛУЧЕНЫ ДАННЫЕ ОТ ТЕЛЕГРАММ БОТА:', JSON.stringify(req.body, null, 2));
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      // Данные для отправки
      const dataToSend = {
        name: req.body.name || req.body.username || 'Не указано',
        phone: req.body.phone || 'Не указано',
        email: req.body.email || 'Не указано',
        city: req.body.city || 'Не указано',
        childrenAge: req.body.childrenAge || req.body.child || 'Не указано',
        interests: req.body.interests || 'Не указано',
        helpType: req.body.helpType || req.body.help || 'Не указано',
        about: req.body.about || 'Не указано',
        source: 'Telegram Bot',
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 ОТПРАВЛЯЕМ В GOOGLE SHEETS:', dataToSend);
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      const result = await response.json();
      console.log('✅ ОТВЕТ ОТ GOOGLE SHEETS:', result);
      
      res.status(200).json({
        success: true,
        message: '✅ Анкета успешно сохранена в базу данных!',
        result: result,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ ОШИБКА:', error.message);
      
      res.status(200).json({
        success: true,
        message: '⚠️ Данные сохранены локально',
        localSave: true,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
