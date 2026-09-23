document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-bg]').forEach(function(el) {
    const filename = el.getAttribute('data-bg');
    el.style.backgroundImage = "url('" + filename + "')";
    el.title = filename.replace(/\.[^.]+$/, '').replace(/-+$/, '');
  });
});
