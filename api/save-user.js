export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, nickname, city = 'Санкт-Петербург', children = '' } = req.body;
    
    // ВАЖНО: Здесь будет код для сохранения в Google Sheets
    // Пока имитируем успешное сохранение
    
    console.log('💾 Сохранение пользователя:', { userId, nickname, city });
    
    const response = {
      success: true,
      message: "✅ Профиль сохранен!",
      user: {
        userId,
        nickname,
        city,
        children,
        registered: true
      }
    };

    res.json(response);
  } catch (error) {
    console.error('❌ Ошибка сохранения:', error);
    res.status(500).json({ 
      success: false,
      error: 'Ошибка сохранения профиля'
    });
  }
}
