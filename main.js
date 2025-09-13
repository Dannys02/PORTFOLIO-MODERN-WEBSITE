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