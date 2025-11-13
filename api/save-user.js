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
  
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    console.log('📥 Получены данные:', req.body);
    
    // ТВОЙ_URL_ВЕБ_ПРИЛОЖЕНИЯ из Apps Script
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/ТВОЙ_ID/exec';
    
    // Отправляем данные в Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    const result = await response.json();
    
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
      error: 'Внутренняя ошибка сервера'
    });
  }
}
