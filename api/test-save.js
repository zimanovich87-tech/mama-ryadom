export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    // Тестовые данные
    const testData = {
      name: 'Тестовый пользователь',
      phone: '+79991234567',
      email: 'test@example.com',
      city: 'Москва',
      service: 'Тестовая услуга',
      timestamp: new Date().toISOString()
    };
    
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    res.status(200).json({
      test: true,
      sentData: testData,
      googleSheetsResponse: result
    });
    
  } catch (error) {
    res.status(500).json({
      error: 'Test failed: ' + error.message
    });
  }
}
