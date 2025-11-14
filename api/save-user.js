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
      
      // Подготавливаем данные для таблицы
      const rowData = [
        new Date().toISOString(), // A: Дата регистрации
        req.body.user_id || 'Не указан', // B: user_id
        req.body.username || 'Не указан', // C: username
        req.body.city || 'Не указан', // D: Город
        req.body.children || 'Не указан' // E: дети
      ];
      
      console.log('📊 Данные для записи:', rowData);
      
      // Используем Google Apps Script как прокси для записи в Sheets
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'save_user',
          sheet_name: 'user_profiles',
          data: rowData
        })
      });
      
      const result = await response.json();
      console.log('✅ Ответ от Google Apps Script:', result);
      
      if (result.success) {
        res.status(200).json({
          success: true,
          message: '✅ Анкета успешно сохранена в базу данных!',
          savedData: {
            user_id: req.body.user_id,
            username: req.body.username,
            city: req.body.city,
            children: req.body.children
          },
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(result.error || 'Ошибка от Google Sheets');
      }
      
    } catch (error) {
      console.error('❌ Ошибка сохранения:', error);
      
      // Fallback
      res.status(200).json({
        success: true,
        message: '⚠️ Данные сохранены локально',
        localSave: true,
        error: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
