export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Обрабатываем preflight запрос
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // GET для тестирования
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Save User API работает. Используй POST для сохранения данных.',
      example: {
        name: 'Имя пользователя',
        phone: '+79991234567',
        email: 'email@example.com',
        city: 'Город',
        service: 'Услуга'
      },
      timestamp: new Date().toISOString()
    });
  }
  
  // POST для сохранения данных
  if (req.method === 'POST') {
    try {
      console.log('📥 Получены данные от пользователя:', req.body);
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      // Отправляем данные в Google Apps Script
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      
      const result = await response.json();
      console.log('📤 Ответ от Google Sheets:', result);
      
      if (result.success) {
        console.log('✅ Данные сохранены в Google Sheets');
        res.status(200).json({
          success: true,
          message: 'Данные успешно сохранены',
          appsScriptResult: result
        });
      } else {
        console.error('❌ Ошибка Apps Script:', result);
        res.status(500).json({
          success: false,
          error: 'Ошибка при сохранении в Google Sheets'
        });
      }
      
    } catch (error) {
      console.error('❌ Серверная ошибка:', error);
      res.status(500).json({
        success: false,
        error: 'Внутренняя ошибка сервера: ' + error.message
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
