document.addEventListener("DOMContentLoaded", function () {
    var currentImage = document.getElementById("current-image");
    var currentIndex = 1;

    function updateCurrentImage() {
        currentImage.src = "images/image" + currentIndex + ".jpg";
        currentImage.alt = "Image " + currentIndex;
    }

    function showNextImage() {
        currentIndex = (currentIndex % 10) + 1;
        updateCurrentImage();
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 2 + 10) % 10 + 1;
        updateCurrentImage();
    }

    function handleNextClick() {
        showNextImage();
    }

    function handlePreviousClick() {
        showPreviousImage();
    }
    var nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", handleNextClick);

    var prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.addEventListener("click", handlePreviousClick);

    var imageGallery = document.getElementById("image-gallery");
    imageGallery.appendChild(prevButton);
    imageGallery.appendChild(nextButton);

    updateCurrentImage();
});
