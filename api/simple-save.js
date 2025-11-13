const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxlSoGC2EIqb9VVKDSacEwb-79AnEeXomTYK5EMclnmJTDqTxs5Tq1pESZkaW5dk40Z7w/exec';

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
    
    console.log('🧪 Тестовое сохранение...');
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log('✅ Результат теста:', result);
    
    res.json({
      success: true,
      message: '✅ Тест сохранения прошел!',
      data: result
    });
  } catch (error) {
    console.error('❌ Ошибка теста:', error);
    res.json({
      success: false,
      error: error.message
    });
  }
}
