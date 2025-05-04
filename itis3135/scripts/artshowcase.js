const commissionForm = document.getElementById("commission-form");
if (commissionForm) {
    commissionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        setTimeout(() => {
            const parent = commissionForm.parentElement;
            parent.innerHTML = '<p class="form-response">Thank you for contacting us!</p>';
        }, 500);
    });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        setTimeout(() => {
            const parent = contactForm.parentElement;
            parent.innerHTML = '<p class="form-response">Thank you for contacting us!</p>';
        }, 500);
    });
}

const galleryButton = document.getElementById("gallery-button");
if (galleryButton) {
    galleryButton.addEventListener("click", function () {
        window.location.href = "gallery.html";
    });
}

const lightboxOverlay = document.createElement("div");
lightboxOverlay.id = "lightbox";
lightboxOverlay.innerHTML = '<span id="lightbox-close">&times;</span><img id="lightbox-img">';
document.body.appendChild(lightboxOverlay);

const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

lightboxClose.addEventListener("click", () => {
    lightboxOverlay.style.display = "none";
});

const galleryImages = document.querySelectorAll("#gallerygrid img");
galleryImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxOverlay.style.display = "flex";
    });
});