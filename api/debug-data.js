export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  console.log('=== 🔍 ДЕБАГ ДАННЫХ ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('=======================');
  
  res.status(200).json({
    success: true,
    message: 'Данные получены',
    debugInfo: {
      method: req.method,
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
    }
  });
}
