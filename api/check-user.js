export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { userId } = req.body;
    
    // Пока всегда возвращаем, что пользователь не найден
    // (будет показывать форму регистрации)
    const response = {
      exists: false,
      message: "👤 Пользователь не найден",
      userId: userId
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка проверки пользователя' });
  }
}
