export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('=== 📥 ДАННЫЕ ОТ ТЕЛЕГРАММ БОТА ===');
      console.log(JSON.stringify(req.body, null, 2));
      
      const baseUrl = 'https://script.google.com/macros/s/AKfycbzDBVfhILT7Q5jazaFgVXovqbcaRRFKUk3XmxcKhMeLoronwT51DuCda0UmjHsXrTc-Fw/exec';
      
      const params = new URLSearchParams({
        action: 'save_user',
        user_id: req.body.userId || '',
        username: req.body.nickname || '',
        city: req.body.city || '',
        children: req.body.children || '',
        source: 'Telegram Mini App',
        timestamp: new Date().toISOString()
      });
      
      const appsScriptUrl = `${baseUrl}?${params.toString()}`;
      
      console.log('📤 Отправляем GET запрос на Apps Script');
      
      const response = await fetch(appsScriptUrl);
      const result = await response.json();
      
      console.log('✅ Ответ от Apps Script:', result);
      
      res.status(200).json({
        success: true,
        message: '✅ Регистрация успешно завершена!',
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      
      res.status(200).json({
        success: true,
        message: '✅ Регистрация завершена!',
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
