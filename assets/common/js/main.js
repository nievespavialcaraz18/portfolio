document.addEventListener("DOMContentLoaded", () => {
    // ── Lightbox Logic ──
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox__close");
    
    if (!lightbox || !lightboxImg || !closeBtn) return;

    // Find all images in the projects carousel that are NOT inside a link
    const galleryImages = document.querySelectorAll(".projects__slide img");

    galleryImages.forEach(img => {
        const parentLink = img.closest("a");
        
        // We only add the zoom effect if the slide is not meant to navigate somewhere
        // Note: In index.html, slides are <a> tags with hrefs. In circus.html, they are <div> tags or <a> tags without an href.
        const isLink = parentLink && parentLink.getAttribute("href") && parentLink.getAttribute("href") !== "#" && parentLink.getAttribute("href") !== "";
        
        if (!isLink) {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", (e) => {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add("active");
            });
        }
    });

    const closeLightbox = () => lightbox.classList.remove("active");

    closeBtn.addEventListener("click", closeLightbox);
    
    lightbox.addEventListener("click", (e) => {
        // Close if clicking on the background, not the image itself
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
