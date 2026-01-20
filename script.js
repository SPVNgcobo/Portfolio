// Typewriter Effect
const phrases = ["Systems Thinker", "Innovator", "Tech Founder"];
let pI = 0, cI = 0, isDel = false;
const el = document.getElementById('typing-text');

function type() {
    const curr = phrases[pI];
    el.textContent = isDel ? curr.substring(0, cI - 1) : curr.substring(0, cI + 1);
    isDel ? cI-- : cI++;
    
    if (!isDel && cI === curr.length) {
        isDel = true;
        setTimeout(type, 2000);
    } else if (isDel && cI === 0) {
        isDel = false;
        pI = (pI + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDel ? 50 : 100);
    }
}
type();

// Scroll Reveal
const reveal = () => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) el.classList.add('active');
    });
};
window.addEventListener('scroll', reveal);
reveal();

// Nav Scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
const ham = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
ham.addEventListener('click', () => navLinks.classList.toggle('active'));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            t.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// Particle System
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 217, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = Array.from({ length: 80 }, () => new Particle());

function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
            const dx = p.x - particles[j].x;
            const dy = p.y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - d / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your EmailJS public key
})();

// Contact Form Handler
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    try {
        // Send email via EmailJS
        const response = await emailjs.send(
            "YOUR_SERVICE_ID_HERE",  // Replace with your service ID
            "YOUR_TEMPLATE_ID_HERE",  // Replace with your template ID
            {
                to_email: "s.p.ngcobo@outlook.com",
                from_name: formData.name,
                from_email: formData.email,
                company: formData.company || "Not provided",
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email
            }
        );
        
        // Success state
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    } catch (error) {
        // Error state
        formStatus.className = 'form-status error';
        formStatus.textContent = '✗ Failed to send message. Please try again or contact me directly.';
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.error('Email error:', error);
    }
});