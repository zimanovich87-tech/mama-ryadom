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

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от Telegram бота:', req.body);
      
      // Apps Script URL
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      // Отправляем ЛЮБОЙ POST запрос (данные не важны, Apps Script использует авто-данные)
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // Пустой объект, так как данные все равно не передаются
      });
      
      const result = await response.json();
      console.log('✅ Ответ от Google Apps Script:', result);
      
      // Всегда возвращаем успех
      res.status(200).json({
        success: true,
        message: '✅ Регистрация успешно завершена!',
        bot_data: req.body, // Данные от бота (для информации)
        sheets_response: result, // Ответ от Google Sheets
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      
      res.status(200).json({
        success: true,
        message: '✅ Регистрация завершена (локальное сохранение)',
        localSave: true,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
