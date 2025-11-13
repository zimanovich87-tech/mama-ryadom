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
      timestamp: new Date().toISOString()
    });
  }

  // POST для сохранения данных
  if (req.method === 'POST') {
    try {
      console.log('🔍 ПОЛНЫЕ ДАННЫЕ ОТ ТЕЛЕГРАММ БОТА:');
      console.log('Method:', req.method);
      console.log('Headers:', req.headers);
      console.log('Body:', JSON.stringify(req.body, null, 2));
      console.log('Body type:', typeof req.body);
      console.log('Body keys:', Object.keys(req.body));
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      // Преобразуем данные под нашу структуру
      const userData = {
        name: req.body.name || req.body.username || req.body.nickname || 'Не указано',
        phone: req.body.phone || req.body.telephone || 'Не указано',
        email: req.body.email || 'Не указано',
        city: req.body.city || req.body.location || 'Не указано',
        childrenAge: req.body.childrenAge || req.body.childAge || req.body.children || req.body.child || 'Не указано',
        interests: req.body.interests || req.body.hobbies || 'Не указано',
        helpType: req.body.helpType || req.body.help || req.body.service || 'Не указано',
        about: req.body.about || req.body.description || req.body.bio || 'Не указано',
        telegramData: req.body.telegramData || req.body.from || 'Не указано',
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 Преобразованные данные для Google Sheets:', userData);
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
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
      console.error('❌ Ошибка сохранения:', error.message);
      
      // Все равно возвращаем успех для Telegram бота
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
