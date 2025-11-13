export default async function handler(req, res) {
  console.log('🧪 Тест с данными как от Telegram бота');
  
  try {
    // Данные как от реального Telegram бота
    const telegramData = {
      username: 'maria_petrova',
      city: 'Санкт-Петербург',
      child: '1 год',
      // Другие поля которые отправляет бот
    };
    
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    console.log('📤 Отправляем Telegram-подобные данные:', telegramData);
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramData)
    });
    
    const result = await response.json();
    console.log('✅ Ответ:', result);
    
    res.status(200).json({
      success: true,
      message: 'Тест завершен',
      result: result
    });
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.status(500).json({ error: error.message });
  }
}
