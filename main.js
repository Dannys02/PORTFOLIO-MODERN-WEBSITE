// Typing animation name home
const textMain = " Dannys Martha Favrillia";
let index = 0;
let isDeleting = false;
const target = document.getElementById("name-typing");

function ketikLoop() {
  if (!isDeleting) {
    target.textContent = textMain.substring(0, index + 1);
    index++;
    
    if (index === textMain.length) {
      setTimeout(() => {
        isDeleting = true;
        ketikLoop();
      }, 3000);
      return;
    }
    
  } else {
    index--;
    target.textContent = textMain.substring(0, index);
    
    if (index === 0) {
      isDeleting = false;
    }
  }
  
  setTimeout(ketikLoop, isDeleting ? 50 : 100);
}

ketikLoop();

/* TOMBOL NAVBAR MOBILE */
const tombolTakSenonoh = document.querySelector("nav ul");

function toggleMenu() {
  tombolTakSenonoh.classList.toggle("active");
}

/* ANIMASI BOTTOM */
const elements = document.querySelectorAll(".from-bottom, .from-rotate");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show"); // kasih trigger animasi
    } else {
      entry.target.classList.remove("show"); // biar bisa animasi ulang
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));