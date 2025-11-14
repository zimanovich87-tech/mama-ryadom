export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от бота:', req.body);
      
      // ВРЕМЕННО: просто возвращаем успех
      res.status(200).json({
        success: true,
        message: '✅ Регистрация успешна! (данные пока не в Google Sheets)',
        receivedData: req.body,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
