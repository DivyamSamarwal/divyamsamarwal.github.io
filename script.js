// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTheme(!body.classList.contains('dark'));
    });
}

// Hue Slider (skip.house style)
const hueSlider = document.getElementById('hue-slider');

function updateHue(value) {
    document.documentElement.style.setProperty('--hue', value);
    localStorage.setItem('accent-hue', value);
    if (hueSlider) hueSlider.value = value;
}

if (hueSlider) {
    hueSlider.addEventListener('input', (e) => {
        updateHue(e.target.value);
    });
}

// Load saved theme and hue
(function() {
    // Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    // Hue
    const savedHue = localStorage.getItem('accent-hue');
    if (savedHue) {
        updateHue(savedHue);
    } else {
        updateHue(200); // Default blue
    }
})();

// Contact Form Submission
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.textContent = "Sending...";
        msg.style.color = "var(--text-muted)";
        
        fetch('https://script.google.com/macros/s/AKfycbywnE081z-lNpRNfXeQmSnmlIcLvql8TwMARDBbfmOoCVtcU7PXFz5iK4VWCrrhYbWz/exec', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            msg.textContent = "Message sent.";
            msg.style.color = "#10b981"; // Success color
            form.reset();
            setTimeout(() => { msg.textContent = ""; }, 5000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.textContent = "Error sending message.";
            msg.style.color = "#ef4444"; // Error color
        });
    });
}