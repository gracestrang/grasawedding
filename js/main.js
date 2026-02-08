  // Parallax effect for images and text
  document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
  
    const speeds = [-0.1, -0.18, -0.14, -0.22, -0.12, -0.25, -0.28, -0.08, -0.16, -0.11];
    document.querySelectorAll('.collage-img').forEach((img, i) => {
      img.style.transform = `translateY(${scrollY * speeds[i]}px)`;
    });
  
    // Move text with scroll for parallax effect
    const text = document.querySelector('.masthead-text');
    text.style.transform = `translateY(${scrollY * 0.2}px)`;
  });

  const timelineItems = document.querySelectorAll('.timeline-item');

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  function revealTimelineItems() {
    timelineItems.forEach(item => {
      if (isInViewport(item)) {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
      }
    });
  }
  
  window.addEventListener('scroll', revealTimelineItems);
  window.addEventListener('load', revealTimelineItems);
  

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const mountain = document.querySelector(".mountain-bg");
  
    // slower-than-page parallax speed (0.25 = very slow)
    mountain.style.transform = `translateY(${scrollY * 0.25}px)`;
  });
  
  (function(){
    // Simple accessible accordion behavior
    const accordions = document.querySelectorAll('.accordion-item');

    // Toggle single item
    function toggleItem(item, setTo){
      const btn = item.querySelector('.accordion-header');
      const panel = item.querySelector('.accordion-panel');
      const isOpen = item.getAttribute('aria-expanded') === 'true';
      const open = typeof setTo === 'boolean' ? setTo : !isOpen;

      item.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (open) {
        // set max-height to scrollHeight for animation
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0';
      }
    }

    // Initialize: ensure panels have correct maxHeight if open
    accordions.forEach(item => {
      const panel = item.querySelector('.accordion-panel');
      if (item.getAttribute('aria-expanded') === 'true') {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        item.querySelector('.accordion-header').setAttribute('aria-expanded','true');
      } else {
        panel.style.maxHeight = '0';
        item.querySelector('.accordion-header').setAttribute('aria-expanded','false');
      }
    });

    // Click behavior & keyboard
    document.querySelectorAll('.accordion-header').forEach((btn, index, list) => {
      const item = btn.closest('.accordion-item');

      btn.addEventListener('click', () => {
        toggleItem(item);
      });

      // keyboard navigation for accessibility
      btn.addEventListener('keydown', (e) => {
        const key = e.key;
        const headers = Array.from(document.querySelectorAll('.accordion-header'));
        let idx = headers.indexOf(btn);

        if (key === 'ArrowDown') {
          e.preventDefault();
          const next = headers[(idx + 1) % headers.length];
          next.focus();
        } else if (key === 'ArrowUp') {
          e.preventDefault();
          const prev = headers[(idx - 1 + headers.length) % headers.length];
          prev.focus();
        } else if (key === 'Home') {
          e.preventDefault();
          headers[0].focus();
        } else if (key === 'End') {
          e.preventDefault();
          headers[headers.length - 1].focus();
        } else if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          toggleItem(item);
        } else if (key === 'Escape') {
          // close if open
          if (item.getAttribute('aria-expanded') === 'true') {
            toggleItem(item, false);
            btn.focus();
          }
        }
      });
    });

    // Optional: close others when opening one (accordion behavior)
    // If you prefer allowing multiple open panels at once, comment this block out.
    document.querySelectorAll('.accordion-header').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const currentItem = btn.closest('.accordion-item');
        const willOpen = currentItem.getAttribute('aria-expanded') !== 'true';
        if (willOpen) {
          // close all others
          accordions.forEach(it => {
            if (it !== currentItem) toggleItem(it, false);
          });
        }
      });
    });

    // On window resize, reset max-heights for open panels to match new heights
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        accordions.forEach(item => {
          const panel = item.querySelector('.accordion-panel');
          if (item.getAttribute('aria-expanded') === 'true') {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      }, 120);
    });

  })();

    // Simple RSVP form handler (local only)
    const form = document.getElementById("rsvpForm");
    const successMessage = document.getElementById("successMessage");
    const guestWrapper = document.getElementById("guestCountWrapper");
    const attendance = document.getElementById("attendance");
  
    attendance.addEventListener("change", () => {
      // Hide guest count if declining
      if (attendance.value === "decline") {
        guestWrapper.style.display = "none";
      } else {
        guestWrapper.style.display = "block";
      }
    });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Show success message
      successMessage.style.display = "block";
  
      // Clear form
      form.reset();
      guestWrapper.style.display = "block";
    });


