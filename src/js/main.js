// AOS Animation Initialize
AOS.init({ duration: 1000, once: true });

// Typing Effect
const textMain = " Dannys Martha F";
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
document.getElementById("modal-CV").onclick = () =>
    modal.classList.remove("hidden");
document.getElementById("closeModal").onclick = () =>
    modal.classList.add("hidden");
window.onclick = (e) => {
    if (e.target == modal) modal.classList.add("hidden");
};

// Number Counter Animation
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute("data-target");
                let count = 0;
                const update = () => {
                    const speed = target / 20;
                    if (count < target) {
                        count += speed;
                        entry.target.innerText = Math.ceil(count) + "+";
                        setTimeout(update, 100);
                    } else {
                        entry.target.innerText = target + "+";
                    }
                };
                update();
            }
        });
    },
    { threshold: 1 },
);
counters.forEach((c) => observer.observe(c));

// WhatsApp Form Logic
document.getElementById("FormPage").onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("NamaId").value;
    const sub = document.getElementById("SubjekId").value;
    const msg = document.getElementById("PesanId").value;
    const phone = "6285645837298";

    if (!name || !msg)
        return alert("Please fill in your name and message!");

    const text = `Hi Dannys, my name is ${name}. %0A*Subject:* ${sub} %0A*Message:* ${msg}`;
    window.open(
        `https://api.whatsapp.com/send?phone=${phone}&text=${text}`,
        "_blank",
    );
};