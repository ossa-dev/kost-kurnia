/*
  Kost Kurnia — main.js
  Dipakai di index.html dan 404.html. Setiap fitur memeriksa dulu apakah
  elemennya ada, jadi aman dijalankan di halaman yang tidak memilikinya.
*/
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    const setMenuOpen = (isOpen) => {
      navLinks.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('open'));
    });
    // Close the mobile menu after tapping a link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((sec) => spy.observe(sec));
  }

  /* ---------- Toast feedback ---------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  /* ---------- Share (Web Share API, with fallback) ---------- */
  const shareData = {
    title: document.title,
    text: 'Kost Kurnia, kost nyaman di tengah Kota Semarang. Cek kamar yang tersedia:',
    url: window.location.href,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Pengguna membatalkan share, tidak perlu ditangani.
      }
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Tautan disalin ke clipboard');
        return;
      } catch (err) {
        // Lanjut ke fallback WhatsApp di bawah.
      }
    }
    const waText = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    window.open(`https://wa.me/?text=${waText}`, '_blank', 'noopener');
  };

  document.getElementById('shareBtn')?.addEventListener('click', handleShare);
  document.getElementById('shareBtnFooter')?.addEventListener('click', handleShare);

  /* ---------- Gallery lightbox ---------- */
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (galleryGrid && lightbox) {
    const photos = Array.from(galleryGrid.querySelectorAll('img'));
    let currentIndex = 0;

    const openLightbox = (index) => {
      currentIndex = (index + photos.length) % photos.length;
      const img = photos[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.dataset.caption || img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    photos.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => openLightbox(currentIndex - 1));
    lightboxNext?.addEventListener('click', () => openLightbox(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
    });
  }
});
