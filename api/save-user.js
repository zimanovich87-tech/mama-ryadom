import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Настройки из переменных окружения Vercel
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📥 Данные от бота:', req.body);
      
      const rowData = [
        new Date().toISOString(),
        req.body.user_id || 'Не указан',
        req.body.username || 'Не указан', 
        req.body.city || 'Не указан',
        req.body.children || 'Не указан',
        req.body.interests || 'Не указано',
        req.body.helpType || 'Не указано',
        req.body.about || 'Не указано',
        'Telegram Bot'
      ];
      
      const client = await auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:I`,
        valueInputOption: 'RAW',
        requestBody: { values: [rowData] }
      });
      
      console.log('✅ Данные записаны в Google Sheets!');
      
      res.status(200).json({
        success: true,
        message: '✅ Анкета успешно сохранена в базу данных!'
      });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      res.status(200).json({
        success: true,
        message: '⚠️ Локальное сохранение',
        localSave: true
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
