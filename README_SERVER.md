# Telegram Bot Server O'rnatish

## Muammo
Browser to'g'ridan-to'g'ri Telegram Bot API ga so'rov yuborishni bloklaydi (CORS muammosi). Shuning uchun backend server kerak.

## Yechim

### 1. Node.js va npm o'rnatilgan bo'lishi kerak
- Node.js: https://nodejs.org/
- npm Node.js bilan birga keladi

### 2. Paketlarni o'rnatish
Terminalda quyidagi buyruqni bajaring:
```bash
npm install
```

### 3. Serverni ishga tushirish
```bash
node server.js
```

Yoki:
```bash
npm start
```

Server `http://localhost:3000` manzilida ishga tushadi.

### 4. script.js faylida BACKEND_URL ni yangilash
Agar serverni boshqa portda yoki boshqa serverda ishga tushirsangiz, `script.js` faylida `BACKEND_URL` ni o'zgartiring:

```javascript
const BACKEND_URL = 'http://localhost:3000'; // O'zgartiring
```

### 5. Production uchun
Production muhitida:
- Serverni doimiy ishlaydigan qilib sozlang (PM2, forever, yoki boshqa)
- HTTPS ishlatishni tavsiya qilamiz
- Environment variables orqali BOT_TOKEN va CHAT_ID ni himoya qiling

## Alternativ yechimlar

Agar server yaratishni xohlamasangiz:
1. Telegram havolasini ochish (kodda allaqachon qo'shilgan)
2. Bepul backend xizmatlardan foydalanish (Heroku, Vercel, va hokazo)




