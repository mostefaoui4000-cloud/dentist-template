document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // DYNAMIC GA4 & META PIXEL INJECTION ENGINE
  // ==========================================
  if (clinicConfig.analytics) {
    const { ga4Id, metaPixelId } = clinicConfig.analytics;

    // --- 1. Google Analytics 4 (GA4) ---
    if (ga4Id && ga4Id.trim() !== "") {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ga4Id, { 'send_page_view': true });
    }

    // --- 2. Meta Pixel (Facebook) ---
    if (metaPixelId && metaPixelId.trim() !== "") {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', metaPixelId);
      fbq('track', 'PageView');
    }
  }

  // ==========================================
  // EVENT TRACKING (Conversions & Booking Clicks)
  // ==========================================
  // Track whenever a user clicks "Prendre RDV" or WhatsApp
  document.querySelectorAll(".open-booking").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.gtag) gtag('event', 'click_booking', { 'event_category': 'Conversion' });
      if (window.fbq) fbq('track', 'Schedule');
    });
  });

  document.querySelectorAll(".whatsapp-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.gtag) gtag('event', 'click_whatsapp', { 'event_category': 'Conversion' });
      if (window.fbq) fbq('track', 'Contact');
    });
  });
  // 1. Inject Theme Colors Dynamic Configuration Overrides
  if (clinicConfig.colors) {
    document.documentElement.style.setProperty('--primary-color', clinicConfig.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', clinicConfig.colors.secondary);
    document.documentElement.style.setProperty('--bg-color', clinicConfig.colors.background);
    document.documentElement.style.setProperty('--text-color', clinicConfig.colors.text);
  }

  // 2. Inject Context text throughout Global Classes
  document.querySelectorAll(".dynamic-clinic-name").forEach(el => el.textContent = clinicConfig.name);
  document.querySelectorAll(".dynamic-doctor-name").forEach(el => el.textContent = clinicConfig.doctorName);
  document.querySelectorAll(".dynamic-speciality").forEach(el => el.textContent = clinicConfig.speciality);
  
  // Contacts Injection
  document.querySelectorAll(".whatsapp-btn").forEach(el => el.href = `https://wa.me/${clinicConfig.whatsapp}`);
  document.querySelectorAll(".dynamic-phone-link").forEach(el => {
    el.textContent = clinicConfig.phone;
    el.href = `tel:${clinicConfig.phone.replace(/\s+/g, '')}`;
  });
  document.querySelectorAll(".dynamic-email-link").forEach(el => {
    el.textContent = clinicConfig.email;
    el.href = `mailto:${clinicConfig.email}`;
  });
  
  const addressEl = document.querySelector(".address-text");
  if(addressEl) addressEl.textContent = `📍 ${clinicConfig.address}`;
  
  const mapsIframe = document.getElementById("maps-target");
  if(mapsIframe) mapsIframe.src = clinicConfig.mapsEmbedUrl;

  // 3. Inject Array Elements (Services, Reviews, Hours)
  const servicesTarget = document.getElementById("services-target");
  if (servicesTarget) {
    servicesTarget.innerHTML = clinicConfig.services.map(s => `
      <div class="service-card fade-up">
        <span class="service-icon">${s.icon}</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  const reviewsTarget = document.getElementById("reviews-target");
  if (reviewsTarget) {
    reviewsTarget.innerHTML = clinicConfig.reviews.map(r => `
      <div class="review-card">
        <div class="star-rating">${"★".repeat(r.rating)}</div>
        <p>"${r.text}"</p>
        <div class="review-author">- ${r.name}</div>
      </div>
    `).join('');
  }

  const hoursTarget = document.getElementById("hours-target");
  if (hoursTarget) {
    hoursTarget.innerHTML = clinicConfig.hours.map(h => `
      <li><strong>${h.days}</strong> <span>${h.time}</span></li>
    `).join('');
  }

  // 4. Mobile Menu Navigation Toggler
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // 5. Booking Modal Engine (Embed Control Setup)
  const modal = document.getElementById("bookingModal");
  const openButtons = document.querySelectorAll(".open-booking");
  const closeModal = document.querySelector(".close-modal");
  const iframeContainer = document.getElementById("iframe-container");

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if(modal && iframeContainer) {
        // Creates the embed dynamic target to improve primary window paint lifecycle speed
        iframeContainer.innerHTML = `<iframe src="${clinicConfig.bookingLink}" width="100%" height="100%" frameborder="0"></iframe>`;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      if(iframeContainer) iframeContainer.innerHTML = ""; // Clear iframe allocation resource
    });
    modal.addEventListener("click", (e) => {
      if(e.target === modal) closeModal.click();
    });
  }

  // 6. Scroll Animations with IntersectionObserver Mechanics
  const fadeElements = document.querySelectorAll(".fade-up");
  const appearanceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
        
        // Counter logic trigger inside about segment execution chain loop
        if(entry.target.classList.contains('about')) {
            triggerCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => appearanceObserver.observe(el));
  
  const aboutSection = document.querySelector(".about");
  if(aboutSection) appearanceObserver.observe(aboutSection);

  // 7. Performance Smooth Counter Engine
  function triggerCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
      const type = counter.getAttribute("data-target");
      const target = clinicConfig.stats[type] || 0;
      let count = 0;
      const speed = target / 30; // Scale step speed relative to target volume
      
      const updateCount = () => {
        if (count < target) {
          count = Math.ceil(count + speed);
          counter.innerText = count > target ? target + "+" : count + "+";
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });
  }

  // 8. Auto Injection of SEO Structured Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": clinicConfig.name,
    "image": window.location.href + "images/hero.jpg",
    "telePhone": clinicConfig.phone,
    "email": clinicConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": clinicConfig.address,
      "addressLocality": "Alger",
      "addressCountry": "DZ"
    },
    "url": window.location.href
  };
  const schemaScript = document.getElementById("schema-json");
  if(schemaScript) schemaScript.text = JSON.stringify(schemaMarkup);
});