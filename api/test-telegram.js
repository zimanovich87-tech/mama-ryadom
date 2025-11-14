export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  console.log('🧪 Тест с Telegram данными');
  
  try {
    const telegramData = {
      username: 'test_user_123',
      city: 'Москва',
      child: '2 года',
      interests: 'прогулки, игры',
      helpType: 'ищу друзей',
      about: 'Тестовый пользователь'
    };
    
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    console.log('📤 Отправляем данные:', telegramData);
    
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
