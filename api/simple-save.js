const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  // Простой CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    console.log('🔧 Простой тест Google Script...');
    
    // Простой GET запрос
    const response = await fetch(WEB_APP_URL);
    const result = await response.json();
    
    console.log('✅ Ответ получен:', result);
    
    res.json({
      success: true,
      message: '✅ Простой тест прошел!',
      googleData: result,
      test: 'Работает через Vercel API'
    });
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.json({
      success: false,
      error: error.message,
      test: 'Ошибка в Vercel API'
    });
  }
}
