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

  try {
    console.log('🧪 Тестовый запрос к Google Sheets');
    
    // Тестовые данные
    const testData = {
      name: 'Тестовый пользователь',
      phone: '+79991234567',
      email: 'test@example.com',
      city: 'Москва',
      service: 'Тестовая услуга',
      test: true,
      timestamp: new Date().toISOString()
    };
    
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    console.log('📤 Отправляем данные в Google Sheets:', testData);
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log('📥 Ответ от Google Sheets:', result);
    
    res.status(200).json({
      success: true,
      test: true,
      message: "Тестовые данные отправлены в Google Sheets",
      sentData: testData,
      googleSheetsResponse: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Ошибка теста:', error);
    res.status(500).json({
      success: false,
      error: 'Test failed: ' + error.message,
      timestamp: new Date().toISOString()
    });
  }
}
