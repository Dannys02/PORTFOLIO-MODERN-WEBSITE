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
const tombolBaik = document.querySelector("nav ul");

function toggleMenu() {
  tombolBaik.classList.toggle("active");
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



/*const elementsTwo = document.querySelectorAll(".from-rotate");

const observerTwo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // cari semua box skill di dalam satu baris (pakai parent grid misalnya)
      const parent = entry.target.parentElement;
      const rowItems = Array.from(parent.querySelectorAll(".from-rotate"));

      // tentukan apakah row ganjil atau genap
      const rowIndex = Array.from(parent.children).indexOf(entry.target) < 4 ? 0 : 1;

      // kalau row pertama → animasi dari kiri ke kanan
      // kalau row kedua → animasi dari kanan ke kiri
      if (rowIndex === 0) {
        rowItems.forEach((el, i) => {
          setTimeout(() => el.classList.add("show"), i * 400); // jeda 0.4s per box
        });
      } else {
        rowItems.slice().reverse().forEach((el, i) => {
          setTimeout(() => el.classList.add("show"), i * 400);
        });
      }
    } else {
      entry.target.classList.remove("show"); // reset biar bisa ulang animasi
    }
  });
}, { threshold: 0.2 });

elementsTwo.forEach(el => observerTwo.observe(el));*/




/* MODAL DOWNLOAD CV */
const modal = document.getElementById("cvModal");
const openBtn = document.getElementById("modal-CV");
const closeBtn = document.getElementById("closeModal");

// buka modal
openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  document.body.classList.add("no-scroll", "modal-open");
});

// tutup modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("no-scroll", "modal-open");
});

// klik luar modal untuk tutup
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll", "modal-open");
  }
});