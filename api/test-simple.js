export default async function handler(req, res) {
  console.log('🧪 Простой тест Apps Script');
  
  try {
    // Простые тестовые данные
    const testData = {
      name: 'Тест из Vercel',
      city: 'Тестовый город', 
      child: '2 года',
      test: true,
      timestamp: new Date().toISOString()
    };
    
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    console.log('📤 Отправляем данные:', testData);
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.text(); // Используем text() вместо json()
    console.log('📥 Ответ от Apps Script:', result);
    
    // Пытаемся парсить как JSON, но если ошибка - показываем как текст
    try {
      const jsonResult = JSON.parse(result);
      res.status(200).json({
        success: true,
        message: 'Тест успешен',
        result: jsonResult
      });
    } catch (parseError) {
      res.status(200).json({
        success: false,
        message: 'Apps Script вернул не-JSON',
        rawResponse: result.substring(0, 500)
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
