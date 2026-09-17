$(document).ready(function(){
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip({
      html: true, // Allow HTML content in the tooltip
      placement: 'bottom',
      trigger: 'hover',
      title: function() {
        // Return an HTML string with an image tag
        const imgSrc = $(this).data('image');
        return `<img src="${imgSrc}" class="tooltip-image fadeinfast" alt="Tooltip Image">`;
      }
    });
  });
  