// Tab functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Responsive menu
var sidemenu = document.getElementById("sidemenu");
function openmenu() { sidemenu.classList.add('active'); }
function closemenu() { sidemenu.classList.remove('active'); }

// Typed text animation (minimal plain JS version)
const typedPhrases = ["Welcome!", "स्वागतम्।", "いらっしゃいませ!", "환영!", "欢迎!"];
let typedIndex = 0, charIndex = 0, typing = true;
function typeEffect() {
  const el = document.querySelector('.auto-type');
  if (!el) return;
  el.textContent = typedPhrases[typedIndex].slice(0, charIndex) + (typing ? '|' : '');
  if (typing) {
    if (charIndex < typedPhrases[typedIndex].length) {
      charIndex++;
      setTimeout(typeEffect, 120);
    } else {
      typing = false;
      setTimeout(typeEffect, 1200);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 60);
    } else {
      typing = true;
      typedIndex = (typedIndex + 1) % typedPhrases.length;
      setTimeout(typeEffect, 600);
    }
  }
}
typeEffect();

// Contact form (Google Sheet)
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('https://script.google.com/macros/s/AKfycbywnE081z-lNpRNfXeQmSnmlIcLvql8TwMARDBbfmOoCVtcU7PXFz5iK4VWCrrhYbWz/exec', {
      method: 'POST', body: new FormData(form)
    }).then(response => {
      msg.innerHTML = "Message Sent Successfully";
      setTimeout(() => msg.innerHTML = "", 5000);
      form.reset();
    }).catch(error => {
      msg.innerHTML = "Something went wrong!";
    });
  });
}

// IP address fetch
fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(data=>{
  document.getElementById('ipAddress').textContent = data.ip;
}).catch(()=>{
  document.getElementById('ipAddress').textContent = 'unavailable';
});

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
function setTheme(dark) {
  if (dark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
themeToggle.onclick = function() {
  setTheme(!document.body.classList.contains('dark'));
};
(function() {
  // On load, use system preference or saved
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved === 'dark');
  else setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
})();

// Section scroll animation on view
function animateOnScroll() {
  const animatedEls = document.querySelectorAll('.animate-fade-up,.animate-pop');
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 30) {
      el.style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);