    // Initialize AOS with optimized settings
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });

    // DOM Elements
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const scrollTopBtn = document.getElementById("scroll-top");
    const loading = document.getElementById("loading");

    // Loading screen
    window.addEventListener("load", () => {
      setTimeout(() => {
        loading.classList.add("hidden");
      }, 1000);
    });

    // Mobile menu toggle
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");

      // Animate hamburger lines
      const spans = hamburger.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");

        // Reset hamburger animation
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navbar.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");

        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Navbar scroll effect and scroll-to-top button
    let ticking = false;

    function updateOnScroll() {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        navbar.classList.add("scrolled");
        scrollTopBtn.classList.add("visible");
      } else {
        navbar.classList.remove("scrolled");
        scrollTopBtn.classList.remove("visible");
      }

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    });

  // Smooth scrolling with dynamic navbar height
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--navbar-height")
      );

      const offsetTop = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});


    // Scroll to top functionality
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
      const sections = document.querySelectorAll("section[id]");
      const navLinksElements = document.querySelectorAll(".nav-links a");

      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navLinksElements.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }

    // Throttled scroll event for active nav link
    let navTicking = false;
    window.addEventListener("scroll", () => {
      if (!navTicking) {
        requestAnimationFrame(() => {
          updateActiveNavLink();
          navTicking = false;
        });
        navTicking = true;
      }
    });

    // Keyboard navigation support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");

        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Performance optimization - Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document
      .querySelectorAll(".skill-card, .project-card, .highlight, .stat-item")
      .forEach((el) => {
        animationObserver.observe(el);
      });

    // Error handling for external resources
    window.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "LINK" || e.target.tagName === "SCRIPT") {
          console.warn(
            "Failed to load external resource:",
            e.target.src || e.target.href
          );
        }
      },
      true
    );

    // Performance monitoring
    if ("performance" in window) {
      window.addEventListener("load", () => {
        const loadTime =
          performance.timing.loadEventEnd -
          performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
      });
    }

    // Preload critical resources
    const preloadResources = () => {
      const criticalResources = [
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      ];

      criticalResources.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "style";
        link.href = href;
        document.head.appendChild(link);
      });
    };

    preloadResources();

    // Dynamic typing effect for hero title
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.innerHTML = "";

      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }

    // Initialize typing effect when page loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        const heroTitle = document.querySelector(".hero-content h1");
        if (heroTitle) {
          const originalText = heroTitle.textContent;
          typeWriter(heroTitle, originalText, 80);
        }
      }, 1500);
    });

    // Parallax effect for hero section
    let parallaxTicking = false;
    window.addEventListener("scroll", () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const hero = document.querySelector(".hero");
          if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
          }
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    });

    // Add loading states for external links
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        const icon = this.querySelector("i");
        if (icon && !icon.classList.contains("fa-spinner")) {
          const originalClass = icon.className;
          icon.className = "fas fa-spinner fa-spin";

          setTimeout(() => {
            icon.className = originalClass;
          }, 2000);
        }
      });
    });

    // Console branding
    console.log(`
        ╔════════════════════════════════════════════╗
        ║                                            ║
        ║        🚀 Pawan Kumar Portfolio         ║
        ║                                            ║
        ║     Java Backend Developer & Engineer      ║
        ║                                            ║
        ║   Built with modern web technologies       ║
        ║   Optimized for performance & accessibility ║
        ║                                            ║
        ╚════════════════════════════════════════════╝
      `);

    // Initialize everything when DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
      updateActiveNavLink();

      // Add smooth reveal animation to elements
      const revealElements = document.querySelectorAll(
        ".hero-content, .section-title"
      );
      revealElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";

        setTimeout(() => {
          el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });
    });

    // Save and restore scroll position
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    });

    window.addEventListener("load", () => {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(scrollPosition));
          sessionStorage.removeItem("scrollPosition");
        }, 100);
      }
    });

    // Smooth hover effects for cards
    const cards = document.querySelectorAll(
      ".skill-card, .project-card, .highlight, .stat-item"
    );
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = this.style.transform.replace(
          "scale(1)",
          "scale(1.02)"
        );
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = this.style.transform.replace(
          "scale(1.02)",
          "scale(1)"
        );
      });
    });

    // Enhanced accessibility
    document.addEventListener("keydown", (e) => {
      // Tab navigation enhancement
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation");
    });

    // Add CSS for keyboard navigation
    const keyboardStyles = document.createElement("style");
    keyboardStyles.textContent = `
        .keyboard-navigation *:focus {
          outline: 2px solid var(--primary-color) !important;
          outline-offset: 2px !important;
        }
      `;
    document.head.appendChild(keyboardStyles);

    // Lazy loading for images
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }

    // Service Worker registration for PWA capabilities
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }

    // Theme preference detection
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      // User prefers light mode - could add light theme toggle here
      console.log("User prefers light mode");
    }

    // Reduced motion preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.01ms"
      );
      console.log("Reduced motion preference detected");
    }

    // Network status monitoring
    function updateOnlineStatus() {
      const status = navigator.onLine ? "online" : "offline";
      console.log(`Network status: ${status}`);

      if (!navigator.onLine) {
        // Show offline indicator
        const offlineIndicator = document.createElement("div");
        offlineIndicator.id = "offline-indicator";
        offlineIndicator.innerHTML = "⚠️ You are currently offline";
        offlineIndicator.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            z-index: 10000;
            font-size: 0.9rem;
            animation: slideDown 0.3s ease;
          `;
        document.body.appendChild(offlineIndicator);
      } else {
        // Remove offline indicator
        const indicator = document.getElementById("offline-indicator");
        if (indicator) {
          indicator.remove();
        }
      }
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Add slide down animation
    const slideDownKeyframes = `
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `;

    const animationStyleSheet = document.createElement("style");
    animationStyleSheet.textContent = slideDownKeyframes;
    document.head.appendChild(animationStyleSheet);

    // Performance optimization - debounce resize events
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    const handleResize = debounce(() => {
      // Handle responsive adjustments
      const isMobile = window.innerWidth <= 768;
      const heroHighlights = document.querySelector(".hero-highlights");

      if (heroHighlights) {
        if (isMobile) {
          heroHighlights.style.gridTemplateColumns = "1fr";
        } else {
          heroHighlights.style.gridTemplateColumns =
            "repeat(auto-fit, minmax(250px, 1fr))";
        }
      }
    }, 250);

    window.addEventListener("resize", handleResize);

    // Initialize resize handler
    handleResize();

    // Add custom cursor effect for desktop
    if (window.innerWidth > 768) {
      const cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      cursor.style.cssText = `
          position: fixed;
          width: 20px;
          height: 20px;
          background: var(--primary-color);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: all 0.1s ease;
          mix-blend-mode: difference;
        `;
      document.body.appendChild(cursor);

      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX - 10 + "px";
        cursor.style.top = e.clientY - 10 + "px";
        cursor.style.opacity = "0.8";
      });

      document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
      });

      // Enhanced cursor for interactive elements
      const interactiveElements = document.querySelectorAll(
        "a, button, .skill-card, .project-card"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.style.transform = "scale(1.5)";
          cursor.style.background = "var(--accent-color)";
        });

        el.addEventListener("mouseleave", () => {
          cursor.style.transform = "scale(1)";
          cursor.style.background = "var(--primary-color)";
        });
      });
    }

    // Add page transition effects
    function addPageTransitions() {
      const style = document.createElement("style");
      style.textContent = `
          .page-transition {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .page-transition.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .stagger-animation {
            animation-delay: calc(var(--stagger-delay, 0) * 0.1s);
          }
        `;
      document.head.appendChild(style);

      // Apply transitions to sections
      const sections = document.querySelectorAll("section");
      sections.forEach((section, index) => {
        section.classList.add("page-transition");
        section.style.setProperty("--stagger-delay", index);
      });

      // Trigger transitions on scroll
      const transitionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach((section) => {
        transitionObserver.observe(section);
      });
    }

    addPageTransitions();

    // Add final performance logging
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (performance.getEntriesByType) {
          const navigationTiming =
            performance.getEntriesByType("navigation")[0];
          if (navigationTiming) {
            console.log("📊 Performance Metrics:");
            console.log(
              `   DOM Content Loaded: ${navigationTiming.domContentLoadedEventEnd -
              navigationTiming.domContentLoadedEventStart
              }ms`
            );
            console.log(
              `   Load Complete: ${navigationTiming.loadEventEnd -
              navigationTiming.loadEventStart
              }ms`
            );
            console.log(
              `   Total Load Time: ${navigationTiming.loadEventEnd - navigationTiming.fetchStart
              }ms`
            );
          }
        }
      }, 1000);
    });

    // Initialize all features
    console.log("🎉 Portfolio initialized successfully!");
