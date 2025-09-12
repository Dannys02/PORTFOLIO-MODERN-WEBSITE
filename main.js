// Lightbox untuk sertifikat
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const certImages = document.querySelectorAll('.certificate-item img');

certImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('show');
        lightboxImg.src = img.src;
    });
});

// Simulasi submit form
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim.');
    form.reset();
});

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