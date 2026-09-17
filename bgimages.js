document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-bg]').forEach(function(el) {
    el.style.backgroundImage = "url('" + el.getAttribute('data-bg') + "')";
  });
});
