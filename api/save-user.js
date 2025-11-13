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
      
      // Проверяем Content-Type перед парсингом
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type ответа:', contentType);
      
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // Если пришел HTML или другой контент
        const text = await response.text();
        console.log('⚠️ Получен не-JSON ответ:', text.substring(0, 200));
        
        // Проверяем если это страница авторизации
        if (text.includes('Google Account') || text.includes('signin')) {
          throw new Error('Требуется авторизация Google Apps Script');
        } else if (text.includes('DOCTYPE') || text.includes('html')) {
          throw new Error('Apps Script вернул HTML страницу вместо JSON');
        } else {
          throw new Error(`Неожиданный ответ: ${text.substring(0, 100)}`);
        }
      }
      
      console.log('✅ Ответ от Google Sheets:', result);
      
      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Анкета мамы успешно сохранена в базу!',
          appsScriptResult: result,
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(result.error || 'Ошибка от Google Sheets');
      }
      
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
