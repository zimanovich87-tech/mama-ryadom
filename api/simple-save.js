const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // Тестовые данные
    const testData = {
      action: 'saveUser',
      userId: 'test_' + Date.now(),
      nickname: 'ТестоваяМама',
      city: 'Санкт-Петербург',
      children: '1 ребенок'
    };
    
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    res.json({
      success: true,
      message: '✅ Тест сохранения прошел!',
      data: result
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
}
