export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // Тестовые данные
    const testData = {
      user_id: 123456789,
      username: 'test_user',
      city: 'Москва',
      children: '2 года'
    };
    
    const response = await fetch('https://mama-ryadom-app.vercel.app/api/save-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    res.status(200).json({
      success: true,
      message: 'Тест завершен',
      testData: testData,
      result: result
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
