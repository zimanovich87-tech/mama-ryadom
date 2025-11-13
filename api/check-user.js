export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    console.log('🔍 Check user request:', req.method, req.query);
    
    // Если GET запрос - возвращаем информацию
    if (req.method === 'GET') {
      const { phone, email } = req.query;
      
      // Пока имитируем проверку - всегда "не найден"
      // Позже можно добавить реальную проверку в Google Sheets
      const userExists = false;
      
      return res.status(200).json({
        success: true,
        exists: userExists,
        message: userExists ? "Пользователь найден" : "Пользователь не найден",
        searchedBy: { phone, email },
        timestamp: new Date().toISOString()
      });
    }
    
    // Если POST запрос - тоже работаем
    if (req.method === 'POST') {
      const { phone, email } = req.body;
      
      const userExists = false; // Пока всегда false
      
      return res.status(200).json({
        success: true,
        exists: userExists,
        message: userExists ? "Пользователь найден" : "Пользователь не найден",
        searchedBy: { phone, email },
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка проверки пользователя:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при проверке пользователя',
      timestamp: new Date().toISOString()
    });
  }
}
