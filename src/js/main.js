// --- PRELOADER ANIMATION SEQUENCE ---
window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const loaderProgress = document.getElementById("loader-progress");
  const loaderCounter = document.getElementById("loader-counter");
  const loaderBar = document.getElementById("loader-bar");
  const loaderStatus = document.getElementById("loader-status");
  const loaderWelcome = document.getElementById("loader-welcome");
  const loaderBrand = document.getElementById("loader-brand-text");
  const mainHeader = document.getElementById("main-header");
  const mainContent = document.getElementById("main-content");
  const navbarLogo = document.getElementById("navbar-logo");

  // Lock scroll during preloader
  document.body.classList.add("overflow-hidden");
  window.scrollTo(0, 0);

  // Phase 1: Number Counter from 0% to 100% and Progress Bar
  let currentProgress = 0;
  const duration = 2000; // 2 seconds duration
  const startTime = performance.now();

  function updateLoading(timestamp) {
    const elapsed = timestamp - startTime;
    const progressFactor = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic calculation for realistic loading feel
    const easeProgress = 1 - Math.pow(1 - progressFactor, 3);
    const progress = Math.min(Math.floor(easeProgress * 100), 100);

    if (progress !== currentProgress) {
      currentProgress = progress;
      loaderCounter.textContent = currentProgress;
      loaderBar.style.width = currentProgress + "%";
      loaderStatus.textContent = currentProgress + "%";
    }

    if (progressFactor < 1) {
      requestAnimationFrame(updateLoading);
    } else {
      loaderCounter.textContent = "100";
      loaderBar.style.width = "100%";
      loaderStatus.textContent = "100%";

      // Jeda setelah 100% tercapai
      setTimeout(startWelcomePhase, 600);
    }
  }

  requestAnimationFrame(updateLoading);

  // Phase 2: "welcome to my website" animation
  function startWelcomePhase() {
    // Fade out progress bar & counter
    loaderProgress.style.transition = "all 0.5s ease-out";
    loaderProgress.style.opacity = "0";
    loaderProgress.style.transform = "scale(0.95)";

    setTimeout(() => {
      loaderProgress.style.display = "none";

      // Animasi muncul dari bawah ke atas
      loaderWelcome.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      loaderWelcome.style.opacity = "1";
      loaderWelcome.style.transform = "translateY(0)";

      // Jeda beberapa detik saat teks terlihat
      setTimeout(() => {
        // Animasi menghilang ke atas
        loaderWelcome.style.transition = "all 0.6s cubic-bezier(0.7, 0, 0.84, 0)";
        loaderWelcome.style.opacity = "0";
        loaderWelcome.style.transform = "translateY(-40px)";

        setTimeout(() => {
          loaderWelcome.style.display = "none";
          // Phase 3: "Dannys" zoom dan bergerak ke navbar
          startBrandPhase();
        }, 650);
      }, 1500);
    }, 450);
  }

  // Phase 3: "Dannys" zoom di tengah, lalu move ke atas samping kiri sambil mengecil & menghilang, lalu jeda 3 detik
  function startBrandPhase() {
    // Pastikan posisi berada tepat di tengah viewport
    loaderBrand.style.top = "50%";
    loaderBrand.style.left = "50%";
    loaderBrand.style.transformOrigin = "center center";

    // Muncul dan Zoom dari kecil ke besar secara mulus di tengah layar
    loaderBrand.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    loaderBrand.style.opacity = "1";
    loaderBrand.style.transform = "translate(-50%, -50%) scale(1.35)";

    // Jeda saat tulisan Dannys besar terlihat jelas di tengah layar
    setTimeout(() => {
      // Hitung koordinat presisi navbar logo (posisi atas samping kiri)
      const targetRect = navbarLogo.getBoundingClientRect();
      const currentRect = loaderBrand.getBoundingClientRect();

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      
      // Skala mengecil setara atau lebih kecil dari h2 navbar
      const scaleRatio = targetRect.height > 0 ? (targetRect.height / (currentRect.height / 1.35)) : 0.35;
      const finalScale = Math.min(scaleRatio * 0.85, 0.35);

      // Animate move ke atas samping kiri, mengecil, dan menghilang (fade out)
      loaderBrand.style.transition = "all 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.75s ease-in";
      loaderBrand.style.left = `${targetCenterX}px`;
      loaderBrand.style.top = `${targetCenterY}px`;
      loaderBrand.style.transform = `translate(-50%, -20%) scale(${finalScale})`;
      loaderBrand.style.opacity = "0";

      // Setelah animasi move & fade out selesai (850ms), beri jeda 3 detik
      setTimeout(() => {
        loaderBrand.style.display = "none";

        // JEDA 3 DETIK sebelum seluruh konten muncul agar mulus dan tidak bertabrakan
        setTimeout(() => {
          // Bersamaan: Animasi header dan konten muncul secara mulus
          mainHeader.classList.add("header-visible");
          mainContent.classList.add("content-visible");

          // Preloader backdrop hilang
          preloader.style.transition = "opacity 0.85s ease-out";
          preloader.style.opacity = "0";

          setTimeout(() => {
            // Selesai preloader: hapus elemen & aktifkan scroll
            preloader.remove();
            document.body.classList.remove("overflow-hidden");

            // Refresh AOS agar efek scroll animation berjalan lancar
            AOS.refresh();
          }, 850);
        }, 1000); // Jeda 3 detik
      }, 850);
    }, 1200);
  }
});

// AOS Animation Initialize
AOS.init({ duration: 1000, once: true });

// Typing Effect
const textMain = " Dannys Martha F";
let index = 0;
let isDeleting = false;
const target = document.getElementById("name-typing");

function ketikLoop() {
  if (!target) return;
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

    if (index === 2) {
      isDeleting = false;
    }
  }

  setTimeout(ketikLoop, isDeleting ? 50 : 100);
}

ketikLoop();

// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

// Modal Logic
const modal = document.getElementById("cvModal");
const modalCVBtn = document.getElementById("modal-CV");
const closeModalBtn = document.getElementById("closeModal");

if (modalCVBtn && modal) {
  modalCVBtn.onclick = () => {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };
}

if (closeModalBtn && modal) {
  closeModalBtn.onclick = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };
}

// Number Counter Animation
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetVal = +entry.target.getAttribute("data-target");
        let count = 0;
        const update = () => {
          const speed = targetVal / 20;
          if (count < targetVal) {
            count += speed;
            entry.target.innerText = Math.ceil(count);
            setTimeout(update, 100);
          } else {
            entry.target.innerText = targetVal;
          }
        };
        update();
      }
    });
  },
  { threshold: 1 }
);
counters.forEach((c) => observer.observe(c));

// WhatsApp Form Logic
const formPage = document.getElementById("FormPage");
if (formPage) {
  formPage.onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("NamaId").value;
    const email = document.getElementById("EmailId").value;
    const sub = document.getElementById("SubjekId").value;
    const msg = document.getElementById("PesanId").value;
    const phone = "6285645837298";

    if (!name || !msg)
      return alert("Please fill in your name and message!");

    const text = `Hi Dannys, my name is ${name}. ${email ? `%0A*Email:* ${email}` : ""}%0A*Subject:* ${sub}%0A*Message:* ${msg}`;
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${text}`,
      "_blank"
    );
  };
}