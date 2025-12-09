// Telegram Bot uchun backend server
// Bu faylni ishga tushirish uchun: node server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram Bot sozlamalari
const BOT_TOKEN = '8244558387:AAEaxn5XYCwgxxvOWfHbSJwHVew4KTyIFfk';
const CHAT_ID = '7641124092';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Xabar yuborish endpoint
app.post('/send-message', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Ma'lumotlarni tekshirish
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Barcha maydonlar to\'ldirilishi kerak'
            });
        }

        // Telegram xabari formatlash
        const telegramMessage = `🆕 <b>Yangi Xabar</b>

👤 <b>Ism:</b> ${name}
📧 <b>Email:</b> ${email}
💬 <b>Xabar:</b>
${message}`;

        // Telegram Bot API ga so'rov yuborish
        const response = await axios.post(TELEGRAM_API_URL, {
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML'
        });

        if (response.data.ok) {
            res.json({
                success: true,
                message: 'Xabar muvaffaqiyatli yuborildi'
            });
        } else {
            throw new Error(response.data.description || 'Xatolik yuz berdi');
        }

    } catch (error) {
        console.error('Xabar yuborishda xatolik:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Xabar yuborishda xatolik yuz berdi'
        });
    }
});

// Server ishga tushirish
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlamoqda`);
    console.log(`Xabar yuborish endpoint: http://localhost:${PORT}/send-message`);
});


