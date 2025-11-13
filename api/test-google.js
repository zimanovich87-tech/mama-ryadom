const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  try {
    // Тестовый запрос к Google Apps Script
    const response = await fetch(WEB_APP_URL);
    const result = await response.json();
    
    res.json({
      success: true,
      message: '✅ Подключение к Google Apps Script работает!',
      googleResponse: result
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '❌ Ошибка подключения: ' + error.message
    });
  }
}
