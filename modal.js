document.addEventListener('DOMContentLoaded', function() {
    // Select all figure elements within carousels
    const figures = document.querySelectorAll('.carousel-inner .item figure');

    const expandedImage = document.getElementById('expandedImage');
    const overlayText = document.getElementById('overlayText');

    figures.forEach(figure => {
        figure.addEventListener('click', function() {
            // Get the background image URL from the figure
            const bgImage = window.getComputedStyle(figure).backgroundImage;
            const imageUrl = bgImage.slice(5, -2); // Extract URL from 'url("...")'

            // Extract the filename from the full path and remove the .jpg extension
            let imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1).replace('.jpg', '');

            // Replace all hyphens and underscores with dots
            imageName = imageName.replace(/[-_]/g, '.');

            // Remove any trailing hyphens, underscores, or dots
            imageName = imageName.replace(/[_.-]+$/, '');

            // Set the src of the modal image
            expandedImage.src = imageUrl;

            // Set the overlay text with a hyperlink and the image filename
            const overlayContent = `Printed in editions of 1 with 1 artist's proof
16 inches square or 27 inches, your choice. <br>
contact: 
                <a href="mailto:winterworks92@gmail.com?subject=${imageName}" target="_blank">winterworks92@gmail.com</a> <br><br>
                <i> Image # ${imageName} </i>`;
            overlayText.innerHTML = overlayContent;

            $('#imageModal').modal('show');
            $('#imageModal').addClass('fadeinfast');
        });
    });
});
