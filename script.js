const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const siteHeader = document.getElementById("siteHeader");
const progressBar = document.getElementById("scrollProgress");
const pageLoader = document.getElementById("pageLoader");
const quoteModal = document.getElementById("quoteModal");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const quoteToast = document.getElementById("quoteToast");
const toastClose = document.getElementById("toastClose");

window.addEventListener("load", () => {
  setTimeout(() => pageLoader.classList.add("hidden"), 600);
  setTimeout(() => quoteToast.classList.add("show"), 4200);
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => siteNav.classList.remove('open'));
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (scrollTop > 18) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(item => revealObserver.observe(item));

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const duration = 1300;
    const stepTime = Math.max(25, duration / target);

    const interval = setInterval(() => {
      current += 1;
      counter.textContent = current;
      if (current >= target) clearInterval(interval);
    }, stepTime);

    counterObserver.unobserve(counter);
  });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));

document.querySelectorAll(".service-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".service-card");
    card.classList.toggle("open");
    button.textContent = card.classList.contains("open") ? "Hide detail layout" : "View detail layout";
  });
});

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanels.forEach(panel => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(target)?.classList.add("active");
  });
});

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
  });
});

const modalOpeners = document.querySelectorAll("[data-open-modal]");
const modalClosers = document.querySelectorAll("[data-close-modal]");

const openModal = () => {
  quoteModal.classList.add("active");
  quoteModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
};

const closeModal = () => {
  quoteModal.classList.remove("active");
  quoteModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
};

modalOpeners.forEach(button => button.addEventListener("click", openModal));
modalClosers.forEach(button => button.addEventListener("click", closeModal));

const closeLightboxButtons = document.querySelectorAll("[data-close-lightbox]");
const openLightbox = (src) => {
  lightboxImage.src = src;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  body.classList.remove("modal-open");
};

closeLightboxButtons.forEach(button => button.addEventListener("click", closeLightbox));

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const src = item.dataset.lightbox;
    if (src) openLightbox(src);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});

const modalForm = document.getElementById("modalForm");
const contactForm = document.getElementById("contactForm");

const fakeSuccess = (message) => {
  alert(message);
};

if (modalForm) {
  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
    fakeSuccess("Quick quote popup submitted. Connect this later to WhatsApp, email, or a live form handler.");
    modalForm.reset();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fakeSuccess("Collection request layout submitted. Later you can connect this form to a real email or form service.");
    contactForm.reset();
  });
}

let testimonialIndex = 0;
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonials = document.querySelectorAll(".testimonial");
if (testimonialTrack && testimonials.length > 1) {
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  }, 3800);
}

const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, {
  threshold: 0.45,
  rootMargin: "-20% 0px -30% 0px"
});

sections.forEach(section => sectionObserver.observe(section));

if (toastClose) {
  toastClose.addEventListener("click", () => quoteToast.classList.remove("show"));
}

quoteToast.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  openModal();
  quoteToast.classList.remove("show");
});
