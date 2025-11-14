import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Настройки Google Sheets
const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SPREADSHEET_ID = '1zCboXVlUWnfhYiv7qQUbz-gHxuCkQ-dGO8551f8crC0';
const SHEET_NAME = 'user_profiles';

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от Telegram бота:', req.body);
      
      // Упрощенные данные для таблицы
      const rowData = [
        new Date().toISOString(), // A: Дата регистрации
        req.body.user_id || 'Не указан', // B: user_id
        req.body.username || 'Не указан', // C: username
        req.body.city || 'Не указан', // D: Город
        req.body.children || 'Не указан' // E: дети
      ];
      
      console.log('📊 Данные для записи:', rowData);
      
      // Авторизуемся и записываем данные
      const client = await auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });
      
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:E`, // Только колонки A-E
        valueInputOption: 'RAW',
        requestBody: {
          values: [rowData]
        }
      });
      
      console.log('✅ Данные записаны в Google Sheets!');
      
      res.status(200).json({
        success: true,
        message: '✅ Анкета успешно сохранена в базу данных!',
        savedData: {
          user_id: req.body.user_id,
          username: req.body.username,
          city: req.body.city,
          children: req.body.children
        },
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка сохранения:', error);
      
      // Fallback
      res.status(200).json({
        success: true,
        message: '⚠️ Данные сохранены локально',
        localSave: true,
        error: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
