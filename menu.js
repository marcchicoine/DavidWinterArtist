// Initialize the flag outside the event listener
let isInitialLoad = true;

$(".menu-toggle").on('click', function() {
    // Toggle classes first
    $(this).toggleClass("on");
    $('.menu-section').toggleClass("on");
    $(".nav2 ul").toggleClass('hidden');
    $(".section").toggleClass('hidden');

    // Get the nav sidebar element
    const navSidebar = document.querySelector('.nav__wrapper');

    // After toggling, check the new state
    if ($('.menu-section').hasClass("on")) {
        // The menu was just turned on
        $(window).scrollTop(0);  // Jump to the top of the page

        // Hide the nav sidebar
        navSidebar.classList.add('hidden');
    } else {
        // The menu was just turned off

        // Only replace classes on the initial load
        if (isInitialLoad) {
            // Replace all .fadeinlonglong with nothing
            $('.fadeinlonglong').removeClass('fadeinlonglong');
            $('.typing').removeClass('typing');
            
            // Set the flag to false after the first run
            isInitialLoad = false;
        }

        // Show the nav sidebar
        navSidebar.classList.remove('hidden');
    }
});
$(document).ready(function() {
    // Select the 'about me' text element
    const aboutText = $('.menu-section .aboutme');
    const firstSectionHeight = $('.section1').outerHeight(); // Adjust selector to match your first section

    // Listen to scroll event
    $(window).on('scroll', function() {
        // Check the scroll position
        if ($(window).scrollTop() > firstSectionHeight) {
            // If scrolled past the first section, hide text
            aboutText.css('opacity', '0');
        } else {
            // If within the first section, show text
            aboutText.css('opacity', '1');
        }
    });
});
