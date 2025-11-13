export default async function handler(req, res) {
  // Разрешаем CORS для Telegram
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { initData } = req.body;
    
    // Здесь будет проверка данных от Telegram
    // Пока просто возвращаем успешный ответ
    res.json({
      success: true,
      user: {
        id: Math.floor(Math.random() * 1000000),
        first_name: "Тестовый",
        username: "test_user"
      },
      message: "✅ Mini App инициализирован"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
