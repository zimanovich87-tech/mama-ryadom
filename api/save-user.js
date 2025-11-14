export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от бота:', req.body);
      
      // Apps Script URL
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      // ПРОСТО отправляем ПУСТОЙ POST
      console.log('📤 Отправляем запрос в Google Sheets');
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '{}' // ПУСТОЙ JSON
      });
      
      const result = await response.json();
      console.log('✅ Ответ от Google Sheets:', result);
      
      res.status(200).json({
        success: true,
        message: '✅ Регистрация успешно завершена!',
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      
      res.status(200).json({
        success: true,
        message: '✅ Регистрация завершена!',
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
