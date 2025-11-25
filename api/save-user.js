// /api/save-user.js
export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, nickname, city, children } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'user_id обязателен' });
    }

    // URL Google Apps Script (Web App)
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDBVfhILT7Q5jazaFgVXovqbcaRRFKUk3XmxcKhMeLoronwT51DuCda0UmjHsXrTc-Fw/exec';

    // Формируем параметры для GET-запроса в Apps Script
    const params = new URLSearchParams({
      user_id: String(userId),
      username: String(nickname || ''),
      city: String(city || ''),
      children: String(children || ''),
      source: 'Telegram Mini App',
      role: 'user', // ← КЛЮЧЕВОЕ: устанавливаем роль при регистрации
      timestamp: new Date().toISOString()
    });

    const fullUrl = `${APPS_SCRIPT_URL}?${params.toString()}`;

    console.log('📤 Отправка данных в Apps Script:', fullUrl);

    // Сохраняем в Google Таблицу через doGet
    const saveResponse = await fetch(fullUrl);
    const saveResult = await saveResponse.json();

    console.log('✅ Ответ от Apps Script (сохранение):', saveResult);

    if (!saveResult.success) {
      throw new Error(saveResult.message || 'Неизвестная ошибка при сохранении');
    }

    // Сразу проверяем, что запись появилась (чтобы получить роль и избежать дублей)
    const checkResponse = await fetch('/api/check-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: String(userId) })
    });

    const checkResult = await checkResponse.json();

    if (checkResult.success) {
      return res.status(200).json({
        success: true,
        message: 'Пользователь успешно зарегистрирован',
        profile: {
          userId: checkResult.userId,
          nickname: checkResult.nickname,
          city: checkResult.city,
          children: checkResult.children,
          role: checkResult.role || 'user'
        }
      });
    } else {
      // Если не найден — возвращаем то, что передали
      return res.status(200).json({
        success: true,
        message: 'Сохранено, но профиль не загружен',
        profile: {
          userId: String(userId),
          nickname: nickname || 'Без имени',
          city: city || '',
          children: children || '',
          role: 'user'
        }
      });
    }

  } catch (error) {
    console.error('❌ Ошибка в /api/save-user:', error);
    return res.status(200).json({
      success: false,
      message: 'Ошибка при регистрации',
      error: error.message
    });
  }
}
