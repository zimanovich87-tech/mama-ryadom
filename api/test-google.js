const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLKi8F0fZIeCUv2OFv0Nc76XSW6LZJn1xxS7tSOz8aa3ddjnv0Ju80I2WmybzLdRSA/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const response = await fetch(WEB_APP_URL);
    const result = await response.json();
    
    res.json({
      success: true,
      message: '✅ Google Script работает!',
      data: result
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
}
