document.addEventListener('DOMContentLoaded', () => {
  addThumbnailsAndWrapIndicators();
  initializeCarouselObservers();
});

function extractBackgroundImageUrl(element) {
  const style = window.getComputedStyle(element);
  const backgroundImage = style.getPropertyValue('background-image');
  const urlMatch = backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
  return urlMatch ? urlMatch[1] : '';
}

function dynamicallyUpdateCarousels() {
  const carousels = [];

  // Find all carousel sections by ID prefix "carousel-"
  const allSections = document.querySelectorAll('[id^="carousel-"]');
  allSections.forEach((section) => {
    const carouselId = section.id;
    const figureElements = section.querySelectorAll('.carousel-inner .gd-hero');
    
    const figures = [];

    figureElements.forEach((figureElement) => {
      // Extract background image URL from existing element
      const imageUrl = extractBackgroundImageUrl(figureElement);
      figures.push({ image: imageUrl });
    });

    carousels.push({
      id: carouselId,
      figures: figures
    });
  });

  return carousels;
}

function addThumbnailsAndWrapIndicators() {
  const carousels = dynamicallyUpdateCarousels();

  carousels.forEach((carousel) => {
    const carouselElement = document.getElementById(carousel.id);

    if (carouselElement) {
      const indicatorsOl = carouselElement.querySelector('.carousel-indicators');

      if (indicatorsOl) {
        // Wrap the <ol> in a <span class="indiwrap">
        const wrapperSpan = document.createElement('span');
        wrapperSpan.className = 'indiwrap';
        indicatorsOl.parentNode.insertBefore(wrapperSpan, indicatorsOl);
        wrapperSpan.appendChild(indicatorsOl);

        // Add img elements to each indicator <li>
        carousel.figures.forEach((figure, index) => {
          const indicatorLi = indicatorsOl.children[index];

          if (indicatorLi) {
            // Create img element
            const img = document.createElement('img');
            img.src = figure.image; // Use the actual image URL
            img.alt = `Thumbnail ${index + 1}`;
            img.loading = 'lazy';  // Enable lazy loading
            img.className = 'placeholder'; // Add placeholder class for initial styling

            // Add image loading event to handle transition and remove placeholder
            img.onload = () => {
              img.classList.remove('placeholder'); // Remove placeholder class when loaded
              img.classList.add('fade-in'); // Add fade-in effect
            };

            indicatorLi.appendChild(img);
          }
        });
      }
    }
  });
}

function initializeCarouselObservers() {
  // Observer options
  const observerOptions = {
    root: null, // viewport
    threshold: 0.5, // 50% of the section must be visible
  };

  // Create observer to detect when a section enters the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible, reset the carousel to the first slide
        const carousel = entry.target.querySelector('.carousel');
        if (carousel) {
          $(carousel).carousel(0); // Reset to the first slide using Bootstrap's carousel API
        }
      }
    });
  }, observerOptions);

  // Attach observer to each section
  const sections = document.querySelectorAll('[id^="section"]'); // Adjust the selector if needed
  sections.forEach(section => observer.observe(section));
}
