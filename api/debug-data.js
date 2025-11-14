export default async function handler(req, res) {
  console.log('=== 🔍 ДЕБАГ ДАННЫХ ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  console.log('Body type:', typeof req.body);
  console.log('Body keys:', Object.keys(req.body || {}));
  console.log('Headers:', req.headers['content-type']);
  console.log('=======================');
  
  try {
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    // Простые тестовые данные
    const testData = {
      test: true,
      message: 'Тест из Vercel',
      timestamp: new Date().toISOString(),
      originalData: req.body // Передаем оригинальные данные
    };
    
    console.log('📤 Отправляем в Apps Script:', testData);
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log('✅ Ответ от Apps Script:', result);
    
    res.status(200).json({
      success: true,
      message: 'Тест завершен',
      sentData: testData,
      appsScriptResponse: result,
      originalDataFromBot: req.body
    });
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.status(500).json({ error: error.message });
  }
}
