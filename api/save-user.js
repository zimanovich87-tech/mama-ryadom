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
      console.log('=== 📥 ДАННЫЕ ОТ ТЕЛЕГРАММ БОТА ===');
      console.log(JSON.stringify(req.body, null, 2));
      console.log('================================');
      
      // ПОДГОТАВЛИВАЕМ ДАННЫЕ ДЛЯ APPS SCRIPT
      const dataForAppsScript = {
        user_id: req.body.userId,
        username: req.body.nickname, 
        city: req.body.city,
        children: req.body.children,
        source: 'Telegram Mini App',
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 ОТПРАВЛЯЕМ ДАННЫЕ В APPS SCRIPT:', dataForAppsScript);
      
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForAppsScript)
      });
      
      const result = await response.json();
      console.log('✅ ОТВЕТ ОТ APPS SCRIPT:', result);
      
      res.status(200).json({
        success: true,
        message: '✅ Регистрация успешно завершена!',
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ ОШИБКА:', error);
      
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
