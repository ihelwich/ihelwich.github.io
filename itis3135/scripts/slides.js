let slideIndex = 0;
const slides = document.getElementsByClassName("slides");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

function showSlide(n){
    slideIndex = n;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[n].style.display = "block";
}

const nextSlide = () => {
    slideIndex = slideIndex < 12 ? slideIndex + 1 : 12;
    showSlide(slideIndex);
};

const previousSlide = () => {
    slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;
    showSlide(slideIndex);
};

nextButton.addEventListener("click", nextSlide);
previousButton.addEventListener("click", previousSlide);