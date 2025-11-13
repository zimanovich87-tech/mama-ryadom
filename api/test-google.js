const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    console.log('🔧 Тестируем Google Script...');
    const response = await fetch(WEB_APP_URL);
    const text = await response.text();
    
    // Пытаемся распарсить JSON
    try {
      const result = JSON.parse(text);
      console.log('✅ JSON получен:', result);
      
      res.json({
        success: true,
        message: '✅ Google Script работает!',
        data: result
      });
    } catch (jsonError) {
      // Если не JSON - значит ошибка
      console.error('❌ Ответ не JSON:', text.substring(0, 100));
      res.json({
        success: false,
        error: 'Google Script возвращает HTML вместо JSON',
        responseText: text.substring(0, 200)
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка подключения:', error);
    res.json({
      success: false,
      error: 'Нет подключения: ' + error.message
    });
  }
}
