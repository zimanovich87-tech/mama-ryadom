const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxlSoGC2EIqb9VVKDSacEwb-79AnEeXomTYK5EMclnmJTDqTxs5Tq1pESZkaW5dk40Z7w/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { userId } = req.body;
    
    console.log('🔍 Проверка пользователя:', userId);
    
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    res.json({
      error: 'Ошибка проверки: ' + error.message
    });
  }
}
