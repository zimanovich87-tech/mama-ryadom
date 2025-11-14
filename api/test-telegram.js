export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const testData = {
      username: 'test_user',
      city: 'Москва', 
      child: '3 года',
      helpType: 'тест'
    };
    
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxd-KErFWf79Z-ol-Fx0-oXWmAS80bCa7asMoH-hqGaNuRcXLHI55UJ8Zm2mxK7rcM6Lg/exec';
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    res.status(200).json({
      success: true,
      message: 'Тест завершен',
      result: result
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
