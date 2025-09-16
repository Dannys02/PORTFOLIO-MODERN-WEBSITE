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


// Validasi input
const form = document.getElementById("FormPage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("NamaId").value.trim();
  const email = document.getElementById("EmailId").value.trim();
  const alamat = document.getElementById("AlamatId").value.trim();
  const subjek = document.getElementById("SubjekId").value.trim();
  const pesan = document.getElementById("PesanId").value.trim();
  const noAku = '6285645837298';

  if (nama === "" || email === "" || alamat === "" || subjek === "" || pesan === "") {
    alert('Semua input harus diisi!');
  } else {
    alert('Pesan anda berhasil dikirim');
    const teks = 'Pesan dari ${nama}: ${email}: ${alamat}: ${subjek}: ${pesan}:';
    const urlWa = 'https://wa.me/qr/6BSUF35QVIYBF1';
    window.open(urlWa, '_blank');
  }

});


// Animation number in colom about h1
const counters = document.querySelectorAll("#numberAnimation");

function animateCounter(el) {
  const target = +el.getAttribute("data-target");
  const duration = 2000; // durasi animasi
  const fps = 60;
  const totalFrames = Math.round((duration / 1000) * fps);
  let frame = 0;

  const counterInterval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.round(target * progress);

    el.textContent = current + "+";

    if (frame === totalFrames) {
      clearInterval(counterInterval);
      el.textContent = target + "+"; // pastikan akhir pas
    }
  }, duration / totalFrames);
}

const observerTree = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (!el.classList.contains("counted")) {
        animateCounter(el);
        el.classList.add("counted");
      }
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observerTree.observe(counter));