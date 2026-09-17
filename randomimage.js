// Initialize a flag to track if the script has run
let isImageScriptRun = false;

document.addEventListener('DOMContentLoaded', function() {
    if (!isImageScriptRun) {
        const figures = document.querySelectorAll('.carousel-inner .gd-hero');
        const randomIndex = Math.floor(Math.random() * figures.length);
        const randomFigure = figures[randomIndex];
        const ri = document.querySelector('div.rando');

        // Set a timer to fade to black after 3 seconds (3000 ms)
        setTimeout(function() {
            ri.classList.add('fade-to-black');
            
            // After fade-to-black animation completes, set the background to black
            setTimeout(function() {
                ri.style.backgroundImage = 'none'; // Remove any background image
                ri.style.backgroundColor = '#000'; // Set background to black
            }, 5000); // Delay matches the duration of your fade-out animation
        }, 4000);

        // Get the background image URL from the randomly selected figure
        const bgImage = window.getComputedStyle(randomFigure).backgroundImage;
        const imageUrl = bgImage.slice(5, -2); // Extract URL from 'url("...")'

        // Create a new Image object to preload the image
        const img = new Image();
        img.src = imageUrl;

        // Set up the event listener to apply styles once the image is fully loaded
        img.onload = function() {
            // Apply the background image and make it visible
            ri.style.backgroundImage = `url('${imageUrl}')`;
            ri.style.opacity = 1; // Ensure section is visible
        };

        // Optionally, handle image load errors
        img.onerror = function() {
            console.error('Failed to load the image.');
        };

        // Set the flag to true to prevent the script from running again
        isImageScriptRun = true;
    }
});
