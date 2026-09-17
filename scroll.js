document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav li');
  const outerSections = document.querySelectorAll('section.section');
  let isUserScrolling = false; // Flag to determine user-initiated scroll

  // Function to smoothly scroll to a section and center it in the viewport
  function scrollToSection(targetSection) {
    const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerHeight / 2 - targetSection.offsetHeight / 2;

    window.scrollTo({
      top: sectionTop - offset,
      behavior: 'smooth'
    });
  }

  // Function to smoothly scroll the nav wrapper to center the active nav item
  function smoothScrollToNavItem(item) {
    const navWrapper = document.querySelector('.nav__wrapper');
    const navWrapperHeight = navWrapper.offsetHeight;
    const itemOffsetTop = item.offsetTop;
    const itemHeight = item.offsetHeight;

    // Calculate the position to scroll to center the item
    const scrollPosition = itemOffsetTop - (navWrapperHeight / 2) + (itemHeight / 2);
    
    // Smoothly scroll the nav wrapper
    navWrapper.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Click event listener for nav items
  navItems.forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default anchor click behavior
      isUserScrolling = true; // Set flag to true for user-initiated scroll

      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));

      // Add active class to the clicked nav item
      this.classList.add('active');

      // Scroll to the target section
      const targetId = this.querySelector('a').getAttribute('href');
      const targetSection = document.querySelector(targetId);

      scrollToSection(targetSection); // Smoothly scroll to the section

      // Smoothly scroll the nav item to the center of the nav wrapper
      smoothScrollToNavItem(this);

      // Reset the scrolling flag after a delay
      setTimeout(() => {
        isUserScrolling = false;
      }, 1000); // Adjust this delay if needed based on your scroll speed
    });
  });

  // Intersection Observer to handle scroll-based highlighting
  const observerOptions = {
    root: null, // Uses the viewport as the root
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is in view
  };

  const observer = new IntersectionObserver((entries) => {
    if (!isUserScrolling) { // Only activate observer when not manually scrolling
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active class from all nav items
          navItems.forEach(nav => nav.classList.remove('active'));

          // Find the corresponding nav item
          const targetNavItem = document.querySelector(`a[href="#${entry.target.id}"]`).parentElement;

          if (targetNavItem) {
            // Add active class to the corresponding nav item
            targetNavItem.classList.add('active');

            // Smoothly scroll the active nav item to the center of the nav wrapper
            smoothScrollToNavItem(targetNavItem);
          }
        }
      });
    }
  }, observerOptions);

  // Observe each outer section
  outerSections.forEach(section => {
    observer.observe(section);
  });
});
