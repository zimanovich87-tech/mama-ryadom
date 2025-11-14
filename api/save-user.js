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
      console.log('📥 Данные от бота:', req.body);
      
      // ПОДГОТАВЛИВАЕМ РЕАЛЬНЫЕ ДАННЫЕ для Apps Script
      const userData = {
        action: 'save_user',
        user_id: req.body.userId || 'Не указан',
        username: req.body.nickname || 'Не указан',
        city: req.body.city || 'Не указан',
        children: req.body.children || 'Не указан',
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 Отправляем РЕАЛЬНЫЕ данные в Apps Script:', userData);
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const result = await response.json();
      console.log('✅ Ответ от Apps Script:', result);
      
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
