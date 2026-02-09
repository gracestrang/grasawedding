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
    const accordions = document.querySelectorAll('.accordion-item');
  
    function toggleItem(item, setTo){
      const btn = item.querySelector('.accordion-header');
      const panel = item.querySelector('.accordion-panel');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const open = typeof setTo === 'boolean' ? setTo : !isOpen;
  
      // Update button
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  
      // Update panel
      if(open){
        panel.hidden = false;
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0';
        panel.hidden = true;
      }
    }
  
    // Initialize panels
    accordions.forEach(item => {
      const btn = item.querySelector('.accordion-header');
      const panel = item.querySelector('.accordion-panel');
      if(btn.getAttribute('aria-expanded') === 'true'){
        panel.hidden = false;
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.hidden = true;
        panel.style.maxHeight = '0';
      }
    });
  
    // Click & keyboard events
    document.querySelectorAll('.accordion-header').forEach(btn => {
      const item = btn.closest('.accordion-item');
  
      btn.addEventListener('click', () => {
        const willOpen = btn.getAttribute('aria-expanded') !== 'true';
        toggleItem(item);
  
        // Optional: close others (accordion behavior)
        if(willOpen){
          accordions.forEach(it => {
            if(it !== item) toggleItem(it, false);
          });
        }
      });
  
      btn.addEventListener('keydown', e => {
        const headers = Array.from(document.querySelectorAll('.accordion-header'));
        const idx = headers.indexOf(btn);
  
        switch(e.key){
          case 'ArrowDown':
            e.preventDefault();
            headers[(idx+1)%headers.length].focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            headers[(idx-1+headers.length)%headers.length].focus();
            break;
          case 'Home':
            e.preventDefault();
            headers[0].focus();
            break;
          case 'End':
            e.preventDefault();
            headers[headers.length-1].focus();
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            toggleItem(item);
            break;
          case 'Escape':
            if(btn.getAttribute('aria-expanded') === 'true'){
              toggleItem(item, false);
              btn.focus();
            }
            break;
        }
      });
    });
  
    // Resize: adjust maxHeight
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        accordions.forEach(item => {
          const panel = item.querySelector('.accordion-panel');
          if(item.querySelector('.accordion-header').getAttribute('aria-expanded') === 'true'){
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      }, 120);
    });
  })();
  