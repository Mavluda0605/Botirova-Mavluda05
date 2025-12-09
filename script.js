// ===========================
//  NAVBAR SCROLL HIDE/SHOW
// ===========================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});


// ===========================
//  HAMBURGER MENU
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ===========================
//  TYPING EFFECT
// ===========================

const typingText = document.getElementById('typingText');
const texts = [
    'Salom, men Botirova Mavluda',
    'Men Shirinliklar Pishirish Mutaxassisi',
    'Men Desertlar Yarataman'
];
let textIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const current = texts[textIndex];

    if (deleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!deleting && charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1500);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, deleting ? 50 : 120);
}

setTimeout(type, 1000);


// ===========================
//  PORTFOLIO CARD HOVER
// ===========================

const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
// ===========================
//  TELEGRAM BOT — FORM SUBMIT
// ===========================

const contactForm = document.getElementById("contactForm");

// Telegram Bot sozlamalari
const BOT_TOKEN = "8244558387:AAEaxn5XYCwgxxvOWfHbSJwHVew4KTyIFfk";
const CHAT_ID = "7641124092";

// Backend server URL (agar server ishlamoqda bo'lsa)
const BACKEND_URL = "http://localhost:3000";

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Forma ma'lumotlarini olish
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("message").value.trim();

    // Bo'sh maydonlarni tekshirish
    if (!name || !email || !msg) {
        alert("❌ Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    // Submit tugmasini o'chirib qo'yish
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Yuborilmoqda...";

    // Telegram xabari formatlash
    const telegramMessage = `📧 Yangi xabar keldi!\n\n👤 Ism: ${name}\n📧 Email: ${email}\n💬 Xabar:\n${msg}`;

    try {
        // Avval backend server orqali urinib ko'ramiz
        let response;
        let success = false;

        try {
            // Backend server orqali so'rov yuborish
            response = await fetch(`${BACKEND_URL}/send-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: msg
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    success = true;
                } else {
                    throw new Error(data.error || "Xatolik yuz berdi");
                }
            } else {
                throw new Error("Backend server javob bermadi");
            }
        } catch (backendError) {
            // Agar backend server ishlamasa, to'g'ridan-to'g'ri Telegram API ga so'rov yuborish
            console.log("Backend server ishlamayapti, to'g'ridan-to'g'ri Telegram API ga so'rov yuborilmoqda...");
            
            // Telegram API URL
            const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            
            // POST so'rovi yuborish
            response = await fetch(telegramUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMessage
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.ok) {
                    success = true;
                } else {
                    throw new Error(data.description || "Xatolik yuz berdi");
                }
            } else {
                const errorData = await response.json().catch(() => ({ description: "Server javob bermadi" }));
                throw new Error(errorData.description || "Server javob bermadi");
            }
        }

        if (success) {
            alert("✅ Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.");
            contactForm.reset();
        }

    } catch (error) {
        console.error("Xabar yuborishda xatolik:", error);
        
        // CORS muammosini aniqlash
        const isCorsError = error.message.includes("CORS") || 
                           error.message.includes("Failed to fetch") || 
                           error.message.includes("NetworkError") ||
                           error.name === "TypeError";

        if (isCorsError) {
            alert(
                "❌ Browser xavfsizlik siyosati tufayli xabar to'g'ridan-to'g'ri yuborib bo'lmaydi.\n\n" +
                "✅ Yechim: Backend server yaratish kerak.\n\n" +
                "Quyidagi qadamlarni bajaring:\n" +
                "1. Terminalda: npm install\n" +
                "2. Terminalda: node server.js\n" +
                "3. Serverni ishga tushiring\n\n" +
                "Yoki to'g'ridan-to'g'ri Telegram orqali bog'laning: @melonissa"
            );
        } else {
            alert(
                "❌ Xabar yuborishda xatolik yuz berdi.\n\n" +
                "Xatolik: " + error.message + "\n\n" +
                "Iltimos, qayta urinib ko'ring yoki to'g'ridan-to'g'ri Telegram orqali bog'laning: @melonissa"
            );
        }
    } finally {
        // Submit tugmasini qayta yoqish
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});


// ===========================
//  SECTION FADE-IN ANIMATION
// ===========================

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.6s ease";
    observer.observe(section);
});


// ===========================
//  SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
        });
    });
});


// ===========================
//  NAVBAR BACKGROUND ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    } else {
        navbar.style.background = "transparent";
        navbar.style.boxShadow = "none";
    }
});