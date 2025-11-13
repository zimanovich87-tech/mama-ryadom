const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxlSoGC2EIqb9VVKDSacEwb-79AnEeXomTYK5EMclnmJTDqTxs5Tq1pESZkaW5dk40Z7w/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    console.log('🔧 Тестируем Google Script...');
    const response = await fetch(WEB_APP_URL);
    const result = await response.json();
    
    console.log('✅ Ответ от Google Script:', result);
    
    res.json({
      success: true,
      message: '✅ Google Script работает!',
      data: result
    });
  } catch (error) {
    console.error('❌ Ошибка подключения:', error);
    res.json({
      success: false,
      error: 'Ошибка подключения: ' + error.message
    });
  }
}
