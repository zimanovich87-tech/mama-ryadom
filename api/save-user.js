const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxlSoGC2EIqb9VVKDSacEwb-79AnEeXomTYK5EMclnmJTDqTxs5Tq1pESZkaW5dk40Z7w/exec';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, nickname, city, children } = req.body;
    
    console.log('📨 Отправка данных в Google Script:', { userId, nickname });
    
    // Отправляем данные в Google Apps Script
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'saveUser',
        userId: userId.toString(),
        nickname,
        city,
        children
      })
    });
    
    const result = await response.json();
    console.log('✅ Ответ от Google Script:', result);
    
    res.json(result);
    
  } catch (error) {
    console.error('❌ Ошибка соединения:', error);
    res.status(500).json({ 
      success: false,
      error: 'Ошибка соединения с сервером: ' + error.message
    });
  }
}
