// =====================
// RESPONSIVE NAVBAR
// =====================
let menuOpen = false;

function handleResize() {
  const isMobile = window.innerWidth < 768;
  document.getElementById("desktop-nav").style.display     = isMobile ? "none" : "flex";
  document.getElementById("desktop-contact").style.display = isMobile ? "none" : "flex";
  document.getElementById("menu-btn").style.display        = isMobile ? "flex" : "none";
  if (!isMobile) {
    document.getElementById("mobile-menu").style.display = "none";
    menuOpen = false;
    resetBars();
  }
}

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById("mobile-menu").style.display = menuOpen ? "flex" : "none";
  if (menuOpen) {
    document.getElementById("bar1").style.transform = "translateY(7px) rotate(45deg)";
    document.getElementById("bar2").style.opacity = "0";
    document.getElementById("bar3").style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    resetBars();
  }
}

function closeMenu() {
  menuOpen = false;
  document.getElementById("mobile-menu").style.display = "none";
  resetBars();
}

function resetBars() {
  document.getElementById("bar1").style.transform = "none";
  document.getElementById("bar2").style.opacity = "1";
  document.getElementById("bar3").style.transform = "none";
}

// Run on load and on resize
handleResize();
window.addEventListener("resize", handleResize);


// =====================
  // 1. TYPING EFFECT
  // =====================
  const roles = ["Web Developer", "Python Learner", "AI/ML Enthusiast", "Fresher Dev"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.querySelector(".typing-text");

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex--);
    } else {
      typingEl.textContent = current.substring(0, charIndex++);
    }
    if (!isDeleting && charIndex === current.length + 1) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, isDeleting ? 60 : 100);
  }
  if (typingEl) type();


  // =====================
  // 2. SCROLL ANIMATIONS
  // =====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add("animate-in");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


  // =====================
  // 3. NAVBAR HIDE/SHOW ON SCROLL
  // =====================
  let lastScroll = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = current;
  });


  // =====================
  // 4. ACTIVE NAV LINK HIGHLIGHT
  // =====================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("text-[#a3e635]");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-[#a3e635]");
      }
    });
  });


  // =====================
  // 5. SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });


  // =====================
  // 6. CURSOR GLOW EFFECT
  // =====================
  const glow = document.createElement("div");
  glow.style.cssText = `
    position:fixed; width:300px; height:300px;
    border-radius:50%; pointer-events:none; z-index:0;
    background: radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });


  // =====================
  // 7. SKILL ICONS HOVER BOUNCE
  // =====================
  document.querySelectorAll("#skills img").forEach(img => {
    img.style.transition = "transform 0.2s ease";
    img.addEventListener("mouseenter", () => img.style.transform = "translateY(-8px) scale(1.1)");
    img.addEventListener("mouseleave", () => img.style.transform = "translateY(0) scale(1)");
  });


  // =====================
  // 8. PROJECT CARDS TILT
  // =====================
  document.querySelectorAll("#projects .bg-white\\/5").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
      card.style.transition = "transform 0.1s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
      card.style.transition = "transform 0.4s ease";
    });
  });


  // =====================
  // 9. SCROLL TO TOP BUTTON
  // =====================
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.style.cssText = `
    position:fixed; bottom:2rem; right:2rem;
    width:42px; height:42px; border-radius:50%;
    background:#a3e635; color:#0d1117;
    font-size:1.1rem; font-weight:800;
    border:none; cursor:pointer; z-index:999;
    opacity:0; transition:opacity 0.3s, transform 0.3s;
    box-shadow: 0 0 20px rgba(163,230,53,0.3);
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
    scrollBtn.style.transform = window.scrollY > 300 ? "translateY(0)" : "translateY(10px)";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));



  // ✅ Replace these 3 values with yours
  const EMAILJS_PUBLIC_KEY  = "xD0s-LD-kzkTLSxOK";   // Account tab
  const EMAILJS_SERVICE_ID  = "service_3chdbxf";   // Email Services tab
  const EMAILJS_TEMPLATE_ID = "template_xp8rizp";  // Email Templates tab

  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form    = document.getElementById("contact-form");
  const sendBtn = document.getElementById("send-btn");
  const toast   = document.getElementById("toast");

  function showToast(msg, success) {
    toast.textContent = success ? "✅ " + msg : "❌ " + msg;
    toast.style.background = success ? "#a3e635" : "#ff4d4d";
    toast.style.color = success ? "#0d1117" : "#fff";
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
    }, 4000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Loading state
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;
    sendBtn.style.opacity = "0.7";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        sendBtn.textContent = "Sent! ✅";
        sendBtn.style.opacity = "1";
        form.reset();
        showToast("Message sent! I'll get back to you soon.", true);
        setTimeout(() => {
          sendBtn.textContent = "Send Message ✈";
          sendBtn.disabled = false;
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        sendBtn.textContent = "Send Message ✈";
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
        showToast("Something went wrong. Please try again.", false);
      });
  });

const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

  
