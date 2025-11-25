// /api/save-user.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, nickname, city, children } = req.body;

    // Передаём role=user в GET-запросе к Apps Script
    const baseUrl = 'https://script.google.com/macros/s/AKfycbzDBVfhILT7Q5jazaFgVXovqbcaRRFKUk3XmxcKhMeLoronwT51DuCda0UmjHsXrTc-Fw/exec';
    const params = new URLSearchParams({
      user_id: userId || '',
      username: nickname || '',
      city: city || '',
      children: children || '',
      source: 'Telegram Mini App',
      role: 'user', // ← КЛЮЧЕВОЕ ИЗМЕНЕНИЕ
      timestamp: new Date().toISOString()
    });

    const appsScriptUrl = `${baseUrl}?${params.toString()}`;
    const response = await fetch(appsScriptUrl);
    const result = await response.json();

    console.log('✅ Ответ от Apps Script при сохранении:', result);

    if (result.success) {
      // Сразу проверяем, что запись создана — получаем профиль
      const checkRes = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const profile = await checkRes.json();

      return res.status(200).json({
        success: true,
        message: 'Регистрация завершена',
        profile: profile.success ? profile : null
      });
    } else {
      throw new Error(result.message || 'Неизвестная ошибка');
    }

  } catch (error) {
    console.error('❌ Ошибка save-user:', error);
    return res.status(200).json({
      success: false,
      message: 'Ошибка сохранения',
      error: error.message
    });
  }
}
