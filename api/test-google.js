const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🔧 Тестируем подключение к Google Script...');
    
    // Тестовый GET запрос к Google Apps Script
    const response = await fetch(WEB_APP_URL);
    const result = await response.json();
    
    console.log('✅ Ответ от Google Script:', result);
    
    res.json({
      success: true,
      message: '✅ Подключение к Google Apps Script работает!',
      googleResponse: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Ошибка подключения:', error);
    res.status(500).json({
      success: false,
      error: '❌ Ошибка подключения: ' + error.message,
      timestamp: new Date().toISOString()
    });
  }
}
