const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { userId } = req.body;
    
    console.log('🔍 Проверка пользователя:', userId);
    
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'checkUser',
        userId: userId.toString()
      })
    });
    
    const result = await response.json();
    console.log('✅ Результат проверки:', result);
    
    res.json(result);
    
  } catch (error) {
    console.error('❌ Ошибка проверки:', error);
    res.status(500).json({ 
      error: 'Ошибка проверки пользователя: ' + error.message 
    });
  }
}
