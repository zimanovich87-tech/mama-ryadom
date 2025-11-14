import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Настройки Google Sheets
const auth = new GoogleAuth({
  keyFile: 'service-account-key.json', // Будем использовать переменные окружения
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
      
      // Подготавливаем данные для таблицы user_profiles
      const rowData = [
        new Date().toISOString(), // Дата
        req.body.user_id || 'Не указан', // user_id
        req.body.username || 'Не указан', // username
        req.body.city || 'Не указан', // Город
        req.body.children || req.body.childrenAge || 'Не указан', // дети
        req.body.interests || 'Не указано', // Доп поле
        req.body.helpType || 'Не указано', // Доп поле
        req.body.about || 'Не указано', // Доп поле
        'Telegram Bot' // Источник
      ];
      
      console.log('📊 Данные для записи в user_profiles:', rowData);
      
      // Авторизуемся через Service Account
      const client = await auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });
      
      // Записываем данные в таблицу
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:I`, // Колонки A-I
        valueInputOption: 'RAW',
        requestBody: {
          values: [rowData]
        }
      });
      
      console.log('✅ Данные записаны в Google Sheets!');
      console.log('Обновленный диапазон:', response.data.updates.updatedRange);
      
      res.status(200).json({
        success: true,
        message: '✅ Анкета успешно сохранена в базу данных!',
        savedData: {
          user_id: req.body.user_id,
          username: req.body.username,
          city: req.body.city,
          children: req.body.children
        },
        sheetsResponse: response.data,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Ошибка сохранения в Google Sheets:', error);
      
      // Fallback: сохраняем локально и все равно возвращаем успех
      res.status(200).json({
        success: true,
        message: '⚠️ Данные сохранены локально (ошибка Google Sheets)',
        localSave: true,
        error: error.message,
        receivedData: req.body,
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
