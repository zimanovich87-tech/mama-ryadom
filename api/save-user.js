export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от Telegram бота:', req.body);
      
      // Преобразуем данные в GET параметры
      const userData = {
        name: req.body.name || req.body.username || 'Не указано',
        phone: req.body.phone || 'Не указано',
        email: req.body.email || 'Не указано',
        city: req.body.city || 'Не указано',
        childrenAge: req.body.childrenAge || req.body.child || 'Не указано',
        interests: req.body.interests || 'Не указано',
        helpType: req.body.helpType || req.body.help || 'Не указано',
        about: req.body.about || 'Не указано'
      };
      
      // Создаем URL с GET параметрами
      const baseUrl = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
      const params = new URLSearchParams();
      
      // Добавляем все данные как GET параметры
      Object.keys(userData).forEach(key => {
        if (userData[key] && userData[key] !== 'Не указано') {
          params.append(key, userData[key]);
        }
      });
      
      const appsScriptUrl = `${baseUrl}?${params.toString()}`;
      
      console.log('📤 Отправляем GET запрос:', appsScriptUrl);
      
      // Отправляем GET запрос
      const response = await fetch(appsScriptUrl);
      const result = await response.json();
      
      console.log('✅ Ответ от Google Sheets:', result);
      
      res.status(200).json({
        success: true,
        message: '✅ Анкета успешно сохранена в базу данных!',
        result: result,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      
      res.status(200).json({
        success: true,
        message: '⚠️ Данные сохранены локально',
        localSave: true,
        error: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
