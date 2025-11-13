export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  console.log('🔍 Check user request:', req.query);
  
  // Пока просто возвращаем успех, потом можно добавить проверку в Google Sheets
  res.status(200).json({
    success: true,
    exists: false,
    message: "Функция проверки пользователя готова к настройке",
    timestamp: new Date().toISOString()
  });
}
