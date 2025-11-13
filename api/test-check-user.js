const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxlSoGC2EIqb9VVKDSacEwb-79AnEeXomTYK5EMclnmJTDqTxs5Tq1pESZkaW5dk40Z7w/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Тестовые данные
    const testData = {
      action: 'checkUser',
      userId: '123456' // тестовый ID
    };
    
    console.log('🔍 Тестируем checkUser...');
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log('✅ Результат checkUser:', result);
    
    res.json({
      success: true,
      message: '✅ CheckUser работает!',
      data: result
    });
    
  } catch (error) {
    console.error('❌ Ошибка checkUser:', error);
    res.json({
      success: false,
      error: error.message
    });
  }
}
