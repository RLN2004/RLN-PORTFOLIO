const links = document.querySelectorAll(".navbar a");
const indicator = document.querySelector(".nav-indicator");
const sections = document.querySelectorAll("section");

function moveIndicator(el) {
  const left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  const navHeight = el.parentElement.offsetHeight;
  const top = (navHeight - height) / 2;

  indicator.style.width = width + "px";
  indicator.style.left = left + "px";
  indicator.style.top = top + "px";
  indicator.style.height = height + "px";
}

// Click handling
links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link);
  });
});

// 🔥 Scroll tracking
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 2) {
      currentSection = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
      moveIndicator(link);
    }
  });
});

// Initial load
window.addEventListener("load", () => {
  const active = document.querySelector(".navbar a.active");
  moveIndicator(active);
});





const logoContainer = document.getElementById("logoContainer");

let closeTimeout = null;

logoContainer.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
  logoContainer.classList.add("active");
});

logoContainer.addEventListener("mouseleave", () => {
  closeTimeout = setTimeout(() => {
    logoContainer.classList.remove("active");
  }, 1500);
});

// Mobile/touch devices do not trigger hover, so keep expanded name visible.
const isTouchDevice =
  window.matchMedia("(hover: none)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

if (isTouchDevice) {
  logoContainer.classList.add("active");
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = contactForm.querySelector('input[name="email"]');
    const visitorEmail = emailInput ? emailInput.value.trim() : "";

    if (!visitorEmail) {
      return;
    }

    const gmailComposeUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent("rln1102004@gmail.com")}` +
      `&su=${encodeURIComponent("Portfolio Contact")}` +
      `&body=${encodeURIComponent(`Hi RLN,\n\nMy email is: ${visitorEmail}\n\n`)}`;

    window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
    contactForm.reset();
  });
}
